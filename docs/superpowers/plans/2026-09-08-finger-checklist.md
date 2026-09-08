# Finger Santa Cruz do Sul Tracking and SEO Checklist Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deixar a Finger Santa Cruz do Sul com domínio oficial, SEO/GEO técnico e rastreamento direto de GA4, Google Ads, Meta Pixel e CAPI, sem Google Tag Manager ou Stape.

**Architecture:** Manter o site Next.js atual e centralizar as tags de navegador em um componente pequeno no layout. Centralizar os eventos de WhatsApp e formulário em uma camada de eventos, preservando o endpoint de contato existente e adicionando CAPI somente com credenciais configuradas de forma segura. Corrigir canonical, sitemap, robots e dados estruturados para usar exclusivamente o domínio oficial.

**Tech Stack:** Next.js 16.2.6, React 19, TypeScript, `@next/third-parties/google` somente se necessário para carregamento direto do Google tag, Meta Pixel via script direto, Meta Conversions API via Route Handler.

**Spec:** Checklist solicitado pelo usuário nesta conversa: domínio oficial `fingersantacruz.com.br`, SEO/GEO, GA4, Google Ads, Meta Pixel/CAPI, sem GTM/Stape, validação pública, commit e deploy.

## Global Constraints

- Não usar Google Tag Manager.
- Não usar Stape ou outro servidor intermediário pago.
- Não remover integrações existentes sem identificar o que fazem.
- Preservar o formulário de leads e o endpoint `/api/contact`.
- Usar somente IDs confirmados nas contas Google/Meta; não inventar identificadores.
- O canonical, sitemap, robots, Open Graph e dados estruturados devem apontar para `https://www.fingersantacruz.com.br`.
- Não declarar o dashboard das plataformas como resolvido sem validação no próprio dashboard ou em um teste de evento.

### Task 1: Auditar o estado publicado e os identificadores

**Files:**
- Read: `app/layout.tsx`
- Read: `app/lib/site-config.ts`
- Read: `app/lib/structured-data.ts`
- Read: `app/components/whatsapp-link.tsx`
- Read: `app/components/lead-form.tsx`
- Read: `app/api/contact/route.ts`
- Read: `app/sitemap.ts`
- Read: `app/robots.ts`

- [x] Confirmar no Google Ads/MCC a conta da Finger (`461-336-6819`) e as conversões importadas do GA4.
- [x] Confirmar no Meta Business o Pixel/Dataset `1245684497369332`.
- [x] Confirmar no GA4 o Measurement ID `G-YTJS552PX5`.
- [x] Consultar o domínio oficial, `www`, sitemap e robots; o domínio oficial está online e apontado para a Vercel.
- [x] Registrar os resultados: IDs e domínio confirmados; token da CAPI pendente de configuração segura no Vercel.

### Task 2: Remover dependência de GTM e instalar tags diretas

**Files:**
- Create: `app/components/marketing-tags.tsx`
- Modify: `app/layout.tsx`
- Modify: `package.json` only if a dependency is proven necessary

- [x] Remover o componente `GoogleTagManager` e o ID `GTM-P8FMLBK9`.
- [x] Adicionar diretamente o Google tag do GA4 confirmado; o Google Ads recebe as conversões importadas do GA4.
- [x] Inicializar o Meta Pixel confirmado uma única vez.
- [x] Manter scripts sem duplicação e sem expor tokens no HTML.
- [x] Verificar os arquivos alterados com ESLint.

### Task 3: Conectar eventos de conversão sem quebrar o formulário

**Files:**
- Create or modify: `app/lib/marketing-events.ts`
- Modify: `app/components/whatsapp-link.tsx`
- Modify: `app/components/lead-form.tsx`
- Create or modify: `app/api/meta-conversions/route.ts`

- [x] Emitir PageView e eventos de contato para o Meta Pixel.
- [x] Emitir os seis eventos de clique WhatsApp preservados do GTM para GA4.
- [x] Manter a conversão Google Ads via importação GA4 existente, sem inventar um `send_to`.
- [x] Preparar o evento equivalente à Meta CAPI com `event_id` compartilhado quando o token estiver disponível.
- [x] Manter fallback funcional quando as credenciais de servidor não estiverem configuradas.
- [x] Validar os eventos no domínio publicado após o deploy; os eventos do navegador estão publicados e o endpoint CAPI responde em modo seguro sem token.

### Task 4: Corrigir SEO/GEO técnico

**Files:**
- Modify: `app/lib/site-config.ts`
- Modify: `app/layout.tsx`
- Modify: `app/lib/structured-data.ts`
- Modify: `app/sitemap.ts`
- Modify: `app/robots.ts`

- [x] Garantir domínio oficial com `.com.br` em metadataBase, canonical, sitemap e robots.
- [x] Manter `sameAs` apenas com redes sociais confirmadas da Finger.
- [x] Manter endereço, telefone, horário e área local em dados estruturados sem criar informações não confirmadas.
- [x] Garantir índice permitido e sitemap acessível.
- [x] Preservar favicon da Finger já existente.

### Task 5: Validar, commitar e publicar

**Files:**
- Modify: only files required by Tasks 2-4

- [x] Rodar `npm run lint` e separar avisos/erros preexistentes dos arquivos alterados.
- [x] Rodar `npm run build`.
- [x] Publicar no Vercel após build verde.
- [x] Validar HTTP 200, canonical, sitemap, robots, ausência de `gtm.js` e presença dos IDs no domínio público.
- [x] Validar a publicação dos IDs confirmados e a rota de teste de evento; a confirmação de recebimento dos cliques deve ser feita no painel após uso real.
- [x] Commitar com mensagem descritiva.
- [ ] Enviar ao GitHub somente após a validação e registrar o hash do commit.
