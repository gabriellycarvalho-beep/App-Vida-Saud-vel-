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
    type: 'lanche',
    title: 'Lanche da Manhã',
    subtitle: 'Aporte de energia intermediário',
    timeHint: '10:00 - 11:00',
    iconName: 'Apple',
  },
  {
    type: 'almoco',
    title: 'Almoço',
    subtitle: 'Refeição principal do dia',
    timeHint: '12:00 - 14:00',
    iconName: 'Utensils',
  },
  {
    type: 'jantar',
    title: 'Jantar',
    subtitle: 'Refeição noturna nutritiva',
    timeHint: '19:00 - 21:00',
    iconName: 'Moon',
  },
];

export const DIET_OPTIONS: Record<DietType, Record<MealType, MealOption[]>> = {
  low_carb: {
    cafe: [
      {
        id: 'lc_cafe_1',
        label: 'Pão com ovos e queijo + Fruta',
      },
      {
        id: 'lc_cafe_2',
        label: 'Crepioca de queijo + Fruta',
      },
      {
        id: 'lc_cafe_3',
        label: 'Mingau de aveia com whey, pasta de amendoim e fruta',
      },
      {
        id: 'lc_cafe_4',
        label: 'Panqueca de banana com cobertura de whey',
      },
      {
        id: 'lc_cafe_outro',
        label: 'Outro (digitar personalizado)',
        isCustom: true,
      },
    ],
    lanche: [
      {
        id: 'lc_lanche_1',
        label: '1 Porção de fruta',
      },
      {
        id: 'lc_lanche_outro',
        label: 'Outro (digitar personalizado)',
        isCustom: true,
      },
    ],
    almoco: [
      {
        id: 'lc_almoco_1',
        label: 'Arroz/Batata/Massa + Frango/Carne/Peixe + Salada',
      },
      {
        id: 'lc_almoco_outro',
        label: 'Outro (digitar personalizado)',
        isCustom: true,
      },
    ],
    jantar: [
      {
        id: 'lc_jantar_1',
        label: 'Arroz/Batata/Massa + Frango/Carne/Peixe + Salada',
      },
      {
        id: 'lc_jantar_outro',
        label: 'Outro (digitar personalizado)',
        isCustom: true,
      },
    ],
  },
  high_carb: {
    cafe: [
      {
        id: 'hc_cafe_1',
        label: 'Pão com ovos e queijo + Fruta (Porção maior)',
        tag: 'Porção Maior',
      },
      {
        id: 'hc_cafe_2',
        label: 'Crepioca de queijo + Fruta',
      },
      {
        id: 'hc_cafe_3',
        label: 'Mingau de aveia com whey, pasta de amendoim e fruta',
      },
      {
        id: 'hc_cafe_4',
        label: 'Panqueca de banana com cobertura de whey',
      },
      {
        id: 'hc_cafe_5',
        label: 'Pães de queijo com ovos + Fruta',
      },
      {
        id: 'hc_cafe_outro',
        label: 'Outro (digitar personalizado)',
        isCustom: true,
      },
    ],
    lanche: [
      {
        id: 'hc_lanche_1',
        label: '2 Porções de fruta',
        tag: '2 Porções',
      },
      {
        id: 'hc_lanche_outro',
        label: 'Outro (digitar personalizado)',
        isCustom: true,
      },
    ],
    almoco: [
      {
        id: 'hc_almoco_1',
        label: 'Arroz/Batata/Massa + Frango/Carne/Peixe + Salada + Sobremesa',
        tag: 'Com Sobremesa',
      },
      {
        id: 'hc_almoco_2',
        label: 'Substituição: Hambúrguer Caseiro',
        tag: 'Substituição',
      },
      {
        id: 'hc_almoco_outro',
        label: 'Outro (digitar personalizado)',
        isCustom: true,
      },
    ],
    jantar: [
      {
        id: 'hc_jantar_1',
        label: 'Arroz/Batata/Massa + Frango/Carne/Peixe + Salada',
      },
      {
        id: 'hc_jantar_2',
        label: 'Substituição: Hambúrguer Caseiro',
        tag: 'Substituição',
      },
      {
        id: 'hc_jantar_outro',
        label: 'Outro (digitar personalizado)',
        isCustom: true,
      },
    ],
  },
};
