export interface Carro {
    marca: string;
    modelo: string;
    matricula: string;
    eventos: Record<string, string>; // keys are event names, values are ISO date strings
    cor_rgb: number[];
    data_fabrico: string;
    imagem_url: string;
    quilometragem: number; // also added the kilometers field
  }

  export interface Oficina {
    nome: string;
    imagem_url: string;
    servicos: string[];
    horario: string;
    datas_disponiveis: string[]; // lista de datas no formato ISO (YYYY-MM-DD)
    localizacao: {
      lat: number;
      lng: number;
    };
  }
  