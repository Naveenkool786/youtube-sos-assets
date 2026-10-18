// Weftly — AI Chat API Route
// Receives chat messages + fetches user's data from Supabase + calls Claude Haiku

import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { createServerSupabase, getCurrentUser } from '@/lib/supabase';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    if (!Array.isArray(messages)) {
      return NextResponse.json({ error: 'messages array required' }, { status: 400 });
    }

    // 1. Get the current user + their tenant context
    const session = await getCurrentUser();
    if (!session?.profile) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // 2. Fetch relevant data based on user's role
    const supabase = await createServerSupabase();
    const context: any = {
      user: {
        name: session.profile.display_name,
        role: session.profile.role,
        tenant_type: session.profile.tenant_type,
      },
    };

    if (session.profile.tenant_type === 'brand') {
      const { data: pos } = await supabase
        .from('purchase_orders')
        .select('po_number, style_name, factory:tenants!purchase_orders_factory_id_fkey(name), quantity, status, ex_factory_date')
        .order('po_date', { ascending: false })
        .limit(20);

      const { data: ncrs } = await supabase
        .from('ncrs')
        .select('ncr_number, title, severity, status, issued_at')
        .not('status', 'in', '(closed,rejected)');

      const { data: coq } = await supabase
        .from('v_coq_by_po')
        .select('po_number, prevention, appraisal, internal_failure, external_failure, total_coq')
        .limit(50);

      context.purchase_orders = pos;
      context.open_ncrs = ncrs;
      context.coq_summary = coq;
    } else if (session.profile.tenant_type === 'factory') {
      const { data: pos } = await supabase
        .from('purchase_orders')
        .select('po_number, style_name, brand:tenants!purchase_orders_brand_id_fkey(name), quantity, status, ex_factory_date')
        .order('po_date', { ascending: false })
        .limit(20);
      context.purchase_orders = pos;
    } else if (session.profile.tenant_type === 'inspection_firm') {
      const { data: inspections } = await supabase
        .from('inspections')
        .select('*, po:purchase_orders(po_number, style_name)')
        .order('scheduled_date', { ascending: false })
        .limit(20);
      context.inspections = inspections;
    }

    // 3. Build system prompt
    const systemPrompt = `You are the Weftly AI Assistant — a quality management AI for apparel supply chains.

User context:
${JSON.stringify(context, null, 2)}

Guidelines:
- Answer questions about the user's POs, inspections, defects, NCRs, and Cost of Quality
- Keep answers concise, under 150 words unless more depth is clearly needed
- When citing data, be specific: PO numbers, factory names, exact figures
- If asked about data you don't have context for, say so honestly — don't make up numbers
- Use clear, professional language. No fluff.
- For listing: use short tables or bullet points in plain text
- Current user is a ${session.profile.tenant_type} / role: ${session.profile.role}
- If the user asks for help creating a new PO or NCR, explain the flow and point them at the right page, don't actually do it.`;

    // 4. Call Claude Haiku
    const resp = await anthropic.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages.map((m: any) => ({
        role: m.role,
        content: m.content,
      })),
    });

    const reply = resp.content
      .filter((c: any) => c.type === 'text')
      .map((c: any) => c.text)
      .join('\n');

    return NextResponse.json({ reply });
  } catch (err: any) {
    console.error('AI chat error:', err);
    return NextResponse.json({ error: err.message || 'AI service error' }, { status: 500 });
  }
}
