type Family = {
  name: string;
  partner?: string;
  children?: Family[];
};

const family: Family[] = [
  {
    name: "Boris",
    partner: "Eliane",
    children: [
      {
        name: "Rafael",
        partner: "Andreina",
        children: [
          {
            name: "Andrea",
          },
          {
            name: "Eros",
          },
        ],
      },
      {
        name: "Iuri",
        partner: "Mara",
      },
      {
        name: "Yasser",
      },
      {
        name: "Nabila",
      },
    ],
  },
];

const test: any[] = [
  {
    id: "f01",
    level: 0,
    name: "pedro",
  },
  {
    id: "m01",
    level: 0,
    name: "maria",
  },
  {
    id: "f02",
    level: 1, // calculando por padre o madre
    name: "pepito",
    fatherId: "f01",
    motherId: "m01",
  },
  {
    id: "f03",
    name: "juan",
    fatherId: "f01",
    motherId: "m01",
  },
  {
    id: "f04",
    name: "carlos",
    fatherId: "f01",
    motherId: "m01",
  },
  {
    id: "f05",
    name: "jaimito",
    fatherId: "f02",
    motherId: "m02",
  },
  {
    id: "m02",
    name: "fatima",
  },
];

export const Tree = () => {
  return (
    <div>
      {family.map((parent) => (
        <div>
          <Parents name={parent.name} partner={parent.partner} />
          {parent.children && <Children children={parent.children} />}
        </div>
      ))}
    </div>
  );
};

interface ParentsProps {
  name: string;
  partner?: string;
}

const Parents: React.FC<ParentsProps> = ({ name, partner }) => {
  return (
    <ul>
      <li>{name}</li>
      {partner && <li>{partner}</li>}
    </ul>
  );
};

interface ChildrenProps {
  children?: Family[];
}

const Children: React.FC<ChildrenProps> = ({ children }) => {
  if (!children) {
    return <div></div>;
  }

  return (
    <div style={{ marginLeft: "16px" }}>
      {children.map((child) => (
        <div>
          <Parents name={child.name} partner={child.partner} />
          {child.children && <Children children={child.children} />}
        </div>
      ))}
    </div>
  );
};
