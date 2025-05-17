import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const people = [
  {
    id: 'person-1',
    name: 'Nirintsoa',
    role: 'Directeur',
    avatar: '/image/agent1.png',
  },
  {
    id: 'person-2',
    name: 'Ravis',
    role: 'Assistante',
    avatar: '/image/agent10.png',
  },
  {
    id: 'person-3',
    name: 'Tojo',
    role: 'Sofera',
    avatar: '/image/ag3.jpg',
  },
  {
    id: 'person-4',
    name: 'Mika',
    role: 'Magasiner',
    avatar: '/image/ag4.jpg',
  },
  {
    id: 'person-5',
    name: 'Maris',
    role: 'Vendeur',
    avatar: '/image/ag6.jpg',
  },
  {
    id: 'person-6',
    name: 'Mirana',
    role: 'Magasiner',
    avatar: '/avatar-6.webp',
  },
  {
    id: 'person-7',
    name: 'toky',
    role: 'Chaufeur',
    avatar: '/avatar-7.webp',
  },
  {
    id: 'person-8',
    name: 'Aina',
    role: 'Respo Livraison',
    avatar: '/avatar-8.webp',
  },
];

const Teams = () => {
  return (
    <section className="py-5">
      <div className="container flex flex-col pl-16">
        <h2 className="my-6 text-pretty text-2xl font-bold lg:text-4xl">
          Les employers
        </h2>
      </div>
      <div className="container mt-2 grid gap-x-8 pr-12 gap-y-16 md:grid-cols-2 lg:grid-cols-4">
        {people.map((person) => (
          <div key={person.id} className="flex flex-col items-center">
            <Avatar className="mb-4 size-20 border md:mb-5 lg:size-24">
              <AvatarImage src={person.avatar} />
              <AvatarFallback>{person.name}</AvatarFallback>
            </Avatar>
            <p className="text-center font-medium">{person.name}</p>
            <p className="text-center ">#{person.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Teams;
