import { Card } from "@mui/material";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[var(--font-geist-sans)]">
      <div className="flex max-h-full gap-7">
        <Card className="max-w-96 bg-black text-white">
          <div className="m-8">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus magni id est ullam, asperiores pariatur incidunt
            cupiditate voluptas ea quod inventore obcaecati expedita provident
            maiores totam dolores aperiam voluptatem! Porro.
          </div>
        </Card>
        <Card className="max-w-96 bg-black text-white">
          <div className="m-8 ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus magni id est ullam, asperiores pariatur incidunt
            cupiditate voluptas ea quod inventore obcaecati expedita provident
            maiores totam dolores aperiam voluptatem! Porro.
          </div>
        </Card>
        <Card className="max-w-96 bg-black text-white">
          <div className="m-8">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus magni id est ullam, asperiores pariatur incidunt
            cupiditate voluptas ea quod inventore obcaecati expedita provident
            maiores totam dolores aperiam voluptatem! Porro.
          </div>
        </Card>
      </div>
    </div>
  );
}
