import { Button } from '@/components/ui/button';
import {
    BarChartHorizontal,
    BatteryCharging,
    CircleHelp,
    Layers,
    WandSparkles,
    ZoomIn,
  } from 'lucide-react';
import { Link } from 'react-router-dom';
  
  const reasons = [
    {
      title: 'Description',
      description:
        'cette Logiciel est concue pour repondre au exigence et au attent de chaque entreprise qui sont dans le dommaine du commerce',
      icon: <ZoomIn className="size-6" />,
    },
    {
      title: 'Experience',
      description:
        'elle est concue dans le but de resoudre les probleme de gestion de travaille de chaque employers dans l entreprise pour mieux apprehander les possibiliter de bonne gestion et d organisation au sein de la societe',
      icon: <BarChartHorizontal className="size-6" />,
    },
    {
      title: 'Support',
      description:
        `Pour plus d information sur le logiciel ou l entreprise qui la concue vous pouvez faire un saut a notre site web `,
      icon: <CircleHelp className="size-6" />,
    },
    {
      title: 'Innovation',
      description:
        'les besoin specifique de l utilisateur de ce logiciel est biien mis en evidence par la plus part des fonctionalité de ce dernier ',
      icon: <WandSparkles className="size-6" />,
    },
    {
      title: 'Results',
      description:
        'Cette version 12.2.4 est concu dans le but de donner une meilleur facilité a chaque utilisateur dans ce qu il fait  ',
      icon: <Layers className="size-6" />,
    },
    {
      title: 'Efficiency',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe est aliquid exercitationem, quos explicabo repellat?',
      icon: <BatteryCharging className="size-6" />,
    },
  ];
  
  const Featur = () => {
    return (
      <section className="py-3 pr-30">
        <div className="container">
          <div className="mb-10 md:mb-20">
            <h2 className="mb-2 text-center text-3xl font-semibold lg:text-5xl">
              DETAIL DU LOGICIEL
            </h2>
          </div>
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {reasons.map((reason, i) => (
              <div key={i} className="flex flex-col">
                <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-accent">
                  {reason.icon}
                </div>
                <h3 className="mb-2 text-xl font-semibold">{reason.title}</h3>
                <p className="text-muted-foreground">{reason.description}</p>
              </div>
            ))}
          </div>
          <div className='pt-12 pl-[75vw]'>
           <Link to={"/"}>
            <Button className='w-32'>Quitter</Button>  
           </Link>
          </div>
          
        </div>
      </section>
    );
  };
  
  export default Featur;
  