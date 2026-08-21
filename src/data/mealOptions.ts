import { DietType, MealConfig, MealOption, MealType } from '../types';

export const MEAL_CONFIGS: MealConfig[] = [
  {
    type: 'cafe',
    title: 'Café da Manhã',
    subtitle: 'Primeira refeição do dia',
    timeHint: '07:00 - 09:00',
    iconName: 'Coffee',
  },
  {
    type: 'almoco',
    title: 'Almoço',
    subtitle: 'Refeição principal do dia',
    timeHint: '12:00 - 14:00',
    iconName: 'Utensils',
  },
  {
    type: 'lanche',
    title: 'Lanche da Tarde',
    subtitle: 'Aporte nutritivo da tarde',
    timeHint: '15:30 - 17:00',
    iconName: 'Apple',
  },
  {
    type: 'jantar',
    title: 'Jantar',
    subtitle: 'Refeição noturna nutritiva',
    timeHint: '19:00 - 21:00',
    iconName: 'Moon',
  },
];

export interface ColumnCategory {
  title: string;
  subtitle?: string;
  badge?: string;
  items: string[];
}

export interface MealColumnsData {
  col1Carb: ColumnCategory;
  col2Protein: ColumnCategory;
  col3Extra: ColumnCategory;
  substitution?: {
    title: string;
    description: string;
  };
}

export const COLUMNS_MEAL_DATA: Record<DietType, MealColumnsData> = {
  low_carb: {
    col1Carb: {
      title: 'Carboidratos',
      subtitle: 'Escolha 1 opção',
      items: [
        'Arroz (100g)',
        'Arroz (70g) + Feijão (50g)',
        'Arroz (60g) + Batata (100g)',
        'Macarrão (80g)',
        'Batata Doce (150g)',
        'Cuscuz (100g)',
      ],
    },
    col2Protein: {
      title: 'Proteínas',
      subtitle: 'Escolha 1 opção',
      items: [
        'Peito de frango (150g)',
        'Carne bovina magra (140g)',
        'Carne suína magra (140g)',
        'Filé de peixe (150g)',
        'Soja PTS (200g)',
      ],
    },
    col3Extra: {
      title: 'Salada & Bebida',
      subtitle: 'À vontade / Opcional',
      items: [
        'Salada crua/cozida à vontade (mín. 100g)',
        'Água, limonada sem açúcar ou refri zero',
      ],
    },
  },
  high_carb: {
    col1Carb: {
      title: 'Carboidratos',
      subtitle: 'Escolha 1 opção',
      badge: 'Porção Maior',
      items: [
        'Arroz (160g)',
        'Arroz (100g) + Feijão (100g)',
        'Macarrão (120g)',
        'Batata inglesa (400g ou 300g crua na airfryer)',
        'Batata doce (250g)',
        'Cuscuz (160g)',
      ],
    },
    col2Protein: {
      title: 'Proteínas',
      subtitle: 'Escolha 1 opção',
      items: [
        'Peito de frango (120g)',
        'Carne bovina magra (120g)',
        'Carne suína magra (120g)',
        'Filé de peixe (150g)',
        'Soja PTS (200g)',
      ],
    },
    col3Extra: {
      title: 'Salada & Sobremesa',
      subtitle: 'Com Doce',
      badge: 'Sobremesa',
      items: [
        'Salada à vontade (mín. 100g)',
        'Sobremesa: 2 quadradinhos de chocolate (15g) ou 20g doce de leite',
      ],
    },
    substitution: {
      title: 'Substituição: Hambúrguer Caseiro Fit',
      description:
        '1 pão de hambúrguer (até 70g) + 140g patinho moído (ou 160g frango) + 1 fatia queijo (20g) + salada à vontade + ketchup/mostarda.',
    },
  },
};

export const DIET_OPTIONS: Record<DietType, Record<MealType, MealOption[]>> = {
  low_carb: {
    cafe: [
      {
        id: 'lc_cafe_1',
        title: 'Opção 1: Pão com ovos e queijo + Fruta',
        label: 'Pão com ovos e queijo + Fruta',
        ingredients: [
          '1 Fatia de pão de forma ou 1/2 pão francês (25g)',
          '10g requeijão light (opcional)',
          '2 ovos mexidos',
          '1 banana (ou 1 porção de fruta)',
          'Café sem açúcar (puro ou com leite desnatado)',
        ],
        instructions: 'Doure os ovos mexidos em fogo brando com tempero a gosto. Aqueça o pão com requeijão light opcional e sirva acompanhado da fruta.',
      },
      {
        id: 'lc_cafe_2',
        title: 'Opção 2: Crepioca de queijo + Fruta',
        label: 'Crepioca de queijo + Fruta',
        ingredients: [
          '20g goma de tapioca',
          '1 ovo inteiro + 1 clara',
          '1 fatia (20g) queijo magro',
          '1 porção de fruta fresca',
        ],
        instructions: 'Misture bem a goma, o ovo e a clara. Despeje em frigideira antiaderente, doure dos dois lados, recheie com o queijo e sirva com fruta.',
      },
      {
        id: 'lc_cafe_3',
        title: 'Opção 3: Mingau de aveia com whey',
        label: 'Mingau de aveia com whey',
        ingredients: [
          '30g aveia em flocos finos',
          '150ml leite desnatado ou zero lactose',
          '20g whey protein concentrado',
          '1 porção de fruta',
        ],
        instructions: 'Cozinhe a aveia com o leite até encorpar. Desligue o fogo, mexa o whey até dissolver e adicione a fruta por cima com canela a gosto.',
      },
      {
        id: 'lc_cafe_4',
        title: 'Opção 4: Panqueca de banana com whey',
        label: 'Panqueca de banana com whey',
        ingredients: [
          '1 banana amassada',
          '25g aveia em flocos',
          '1 ovo inteiro',
          'Cobertura: 15g whey com 30ml de leite ou água',
        ],
        instructions: 'Amasse a banana com o ovo e a aveia. Cozinhe na frigideira dos dois lados e cubra com a caldinha de whey.',
      },
      {
        id: 'lc_cafe_outro',
        title: 'Opção 5: Outro',
        label: 'Outro (digite o que você comeu)',
        isCustom: true,
      },
    ],
    almoco: [],
    lanche: [
      {
        id: 'lc_lanche_1',
        title: 'Opção 1: Iogurte com whey',
        label: 'Iogurte com whey + Fruta',
        ingredients: [
          '1 copo iogurte desnatado (150-200g)',
          '30g whey protein',
          '1 porção de fruta',
        ],
        instructions: 'Misture o whey diretamente ao iogurte desnatado até ficar cremoso e consuma com a fruta fresca picada.',
      },
      {
        id: 'lc_lanche_2',
        title: 'Opção 2: Banoffee fit + Whey',
        label: 'Banoffee fit + Whey',
        ingredients: [
          '1 fatia pão de forma ou meio pão francês',
          '15g doce de leite',
          '1/2 banana fatiada (airfryer por 5-8 min com canela)',
          'Shaker: 20g whey + 150ml leite desnatado',
        ],
        instructions: 'Espalhe o doce de leite no pão, cubra com a banana e canela e leve à airfryer por 5-8 min. Tome junto com o shake de whey.',
      },
      {
        id: 'lc_lanche_3',
        title: 'Opção 3: Pão com frango + Fruta',
        label: 'Pão com frango + Fruta',
        ingredients: [
          '1 fatia de pão de forma ou meio pão francês',
          '60g frango desfiado',
          '1 porção de fruta',
        ],
        instructions: 'Monte o sanduíche com o frango desfiado bem temperado e acompanhe com a fruta.',
      },
      {
        id: 'lc_lanche_4',
        title: 'Opção 4: Barrinha/Bebida proteica + Fruta',
        label: 'YoPRO ou Barrinha proteica + Fruta',
        ingredients: [
          '1 YoPRO (200-250ml) ou 1 barrinha proteica (40-60g)',
          '1 porção de fruta',
        ],
        instructions: 'Opção prática e rápida para o dia a dia, combinando a proteína com uma porção de fruta fresca.',
      },
      {
        id: 'lc_lanche_5',
        title: 'Opção 5: Pão com queijo + Whey',
        label: 'Pão com queijo + Whey',
        ingredients: [
          '1 fatia de pão de forma',
          '1 fatia (20g) queijo',
          'Shaker: 20g whey + 150ml leite desnatado',
        ],
        instructions: 'Toste o pão com queijo na sanduicheira ou frigideira e acompanhe com o shake de whey.',
      },
      {
        id: 'lc_lanche_outro',
        title: 'Opção 6: Outro',
        label: 'Outro (digite o que você comeu)',
        isCustom: true,
      },
    ],
    jantar: [],
  },
  high_carb: {
    cafe: [
      {
        id: 'hc_cafe_1',
        title: 'Opção 1: Pão com ovos e queijo + Fruta (Dose Dupla)',
        label: 'Pão com ovos e queijo + Fruta',
        tag: 'Dose Dupla',
        ingredients: [
          '4 Fatias pão de forma ou 2 pães franceses (100g)',
          '2 ovos mexidos temperados',
          '1 fatia (20g) queijo',
          '1 banana ou porção de fruta',
        ],
        instructions: 'Prepare os pães quentes com o queijo e os 2 ovos mexidos. Acompanhe com a porção de fruta.',
      },
      {
        id: 'hc_cafe_2',
        title: 'Opção 2: Crepioca de queijo + Fruta',
        label: 'Crepioca de queijo + Fruta (80g goma)',
        tag: 'Carbo Alto',
        ingredients: [
          '80g goma de tapioca',
          '2 ovos inteiros',
          '1 fatia (20g) queijo',
          '1 porção de fruta',
        ],
        instructions: 'Misture a goma com os 2 ovos e doure na frigideira. Recheie com o queijo e sirva com fruta fresca.',
      },
      {
        id: 'hc_cafe_3',
        title: 'Opção 3: Mingau de aveia turbinado',
        label: 'Mingau de aveia turbinado',
        tag: 'Com Pasta de Amendoim',
        ingredients: [
          '65g aveia em flocos',
          '250ml leite desnatado',
          '20g whey protein',
          '20g pasta de amendoim',
          '1 porção de fruta',
        ],
        instructions: 'Cozinhe a aveia no leite desnatado. Desligue, misture o whey e finalize com a pasta de amendoim e a fruta picada.',
      },
      {
        id: 'hc_cafe_4',
        title: 'Opção 4: Panqueca de banana reforçada',
        label: 'Panqueca de banana reforçada',
        tag: '2 Bananas',
        ingredients: [
          '2 bananas amassadas',
          '50g aveia em flocos',
          '2 ovos inteiros',
          'Cobertura: 20g whey + 30ml leite ou água',
        ],
        instructions: 'Amasse as 2 bananas com os ovos e aveia. Frite na frigideira e regue com a calda cremosa de whey.',
      },
      {
        id: 'hc_cafe_5',
        title: 'Opção 5: Pães de queijo com ovos + Fruta',
        label: 'Pães de queijo com ovos + Fruta',
        tag: '3 Pães de Queijo',
        ingredients: [
          '3 pães de queijo (90g)',
          '3 ovos mexidos temperados',
          '1 porção de fruta',
        ],
        instructions: 'Asse os 3 pães de queijo e sirva com os ovos mexidos e a fruta fresca.',
      },
      {
        id: 'hc_cafe_outro',
        title: 'Opção 6: Outro',
        label: 'Outro (digite o que você comeu)',
        isCustom: true,
      },
    ],
    almoco: [],
    lanche: [
      {
        id: 'hc_lanche_1',
        title: 'Opção 1: Iogurte reforçado',
        label: 'Iogurte reforçado + 2 Frutas',
        tag: '2 Frutas',
        ingredients: [
          '1 copo iogurte desnatado',
          '30g whey protein',
          '2 porções de fruta',
          '15g aveia em flocos ou mucilon',
        ],
        instructions: 'Misture o iogurte com whey e aveia, finalizando com as 2 porções de frutas picadas.',
      },
      {
        id: 'hc_lanche_2',
        title: 'Opção 2: Banoffee fit duplo + Whey',
        label: 'Banoffee fit duplo + Whey',
        tag: 'Carbo Alto',
        ingredients: [
          '2 fatias pão de forma',
          '30g doce de leite',
          '1 banana inteira fatiada com canela',
          'Shaker: 20g whey + 150ml leite desnatado',
        ],
        instructions: 'Passe o doce de leite nas 2 fatias de pão, cubra com a banana e leve à airfryer. Acompanhe com o shake de whey.',
      },
      {
        id: 'hc_lanche_3',
        title: 'Opção 3: Pão com frango duplo + Fruta',
        label: 'Pão com frango duplo + 2 Frutas',
        tag: '2 Frutas',
        ingredients: [
          '2 fatias pão de forma',
          '60g frango desfiado',
          '2 porções de fruta',
        ],
        instructions: 'Sanduíche duplo recheado com frango desfiado temperado, servido com 2 porções de fruta.',
      },
      {
        id: 'hc_lanche_4',
        title: 'Opção 4: Bebida/Barrinha proteica + Fruta',
        label: 'YoPRO/Barrinha + 2 Frutas',
        tag: '2 Frutas',
        ingredients: [
          '1 YoPRO (200-250ml) ou 1 barrinha (40-60g)',
          '2 porções de fruta',
        ],
        instructions: 'Bebida ou barrinha de proteína acompanhada de 2 porções de frutas da sua escolha.',
      },
      {
        id: 'hc_lanche_5',
        title: 'Opção 5: Pão com queijo duplo + Whey',
        label: 'Pão com queijo duplo + Whey',
        tag: 'Carbo Alto',
        ingredients: [
          '2 fatias pão de forma',
          '1 fatia queijo (20g)',
          'Shaker: 20g whey + 200ml leite desnatado',
        ],
        instructions: 'Toste as duas fatias com o queijo e tome o shake proteico de whey no leite.',
      },
      {
        id: 'hc_lanche_outro',
        title: 'Opção 6: Outro',
        label: 'Outro (digite o que você comeu)',
        isCustom: true,
      },
    ],
    jantar: [],
  },
};
