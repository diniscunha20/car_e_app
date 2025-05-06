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