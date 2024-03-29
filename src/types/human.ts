export type Human = {
  id: string;
  firstname: string;
  lastname: string;
  birth: string;
  gender: string;
  nationality: string;
  job: {
    jockey: boolean;
    trainer: boolean;
  };
};
