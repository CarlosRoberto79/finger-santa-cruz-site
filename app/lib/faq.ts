export type FaqItem = {
  question: string;
  answer: string;
};

/**
 * Perguntas frequentes exibidas na seção #duvidas e publicadas como
 * FAQPage (schema.org) em structured-data.ts.
 *
 * Regras combinadas com o cliente:
 * - sem valores, preços ou condições de pagamento;
 * - sem menção a comissão ou RT para arquitetos;
 * - só informações confirmadas pela Finger.
 */
export const faqItems: FaqItem[] = [
  {
    question: "A Finger faz o projeto antes de eu fechar negócio?",
    answer:
      "Sim. O atendimento começa com uma conversa para entender a rotina, as medidas e a atmosfera que você imagina para o ambiente. A partir daí a Finger Santa Cruz do Sul desenvolve o projeto em 3D, para que você veja o ambiente pronto antes de qualquer decisão.",
  },
  {
    question: "Qual é a garantia dos móveis planejados Finger?",
    answer:
      "A Finger oferece cinco anos de garantia contra defeitos de fabricação. Para manter a garantia válida, basta seguir as orientações do manual de limpeza e conservação entregue com os móveis.",
  },
  {
    question: "Quais ambientes a Finger Santa Cruz do Sul planeja?",
    answer:
      "Cozinhas, dormitórios, closets, salas, banheiros, lavanderias, home offices e ambientes corporativos. O projeto pode contemplar a casa inteira ou apenas o ambiente que você quer renovar.",
  },
  {
    question: "A Finger atende quais cidades?",
    answer:
      "Santa Cruz do Sul e região, incluindo Venâncio Aires e Vera Cruz. O showroom fica no centro de Santa Cruz do Sul e o atendimento é feito por lá ou pelo WhatsApp.",
  },
  {
    question: "A entrega e a montagem são feitas pela Finger?",
    answer:
      "Sim. A medição, a entrega e a montagem ficam com a equipe da Finger Santa Cruz do Sul, que acompanha cada etapa até o ambiente ficar pronto do jeito que foi projetado.",
  },
  {
    question: "Qual é o prazo de entrega?",
    answer:
      "O prazo médio é de 28 dias. A data exata é combinada com você no fechamento do projeto, de acordo com o andamento da sua obra.",
  },
  {
    question: "Os móveis são fabricados pela própria Finger?",
    answer:
      "Sim. A Finger fabrica os próprios móveis desde 1978, com parque industrial próprio e maquinário de alta precisão. A marca também exporta e recebeu o Prêmio Exportação RS.",
  },
  {
    question: "Trabalho com arquitetura. Como funciona a parceria?",
    answer:
      "A Finger Santa Cruz do Sul atende arquitetos e designers de interiores com material técnico para especificação e espaço no showroom para reuniões com os seus clientes. É só chamar no WhatsApp que a equipe comercial organiza o primeiro contato.",
  },
  {
    question: "Preciso agendar para conhecer o showroom?",
    answer:
      "Não é obrigatório, mas vale combinar antes pelo WhatsApp. Assim uma especialista reserva o horário e já separa os acabamentos que combinam com o seu projeto. O showroom abre de segunda a sexta, das 8h30 às 12h e das 13h30 às 18h.",
  },
];
