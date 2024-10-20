import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fakeFetcher } from '@/lib/fake/fetcher.db';
import { CnelPayload, PlanificationDetail } from '@/lib/interface/cnel.interface';
import { Blackout } from '@/lib/interface/blackout.interface';
import dayjs from 'dayjs'
import BlackoutForm from './_components/blackout-form';
import CalendarProvider from './_context/calendar.provider';
import BlackoutCalendar from './_components/blackout-calendar';
import BlackoutTable from './_components/blackout-table';
import BlackoutText from './_components/blackout-text';
import Lightbulb from './_components/light-bulb';
import { ScrollArea } from '@/components/ui/scroll-area';
import { fetchBlackout } from '@/server/cnel';
import React from 'react';

interface HomePageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}
const HomePage: React.FC<HomePageProps> = async ({
  searchParams
}) => {

  const document = typeof searchParams.document === 'string' ? searchParams.document : undefined;
  const criteria = typeof searchParams.criteria === 'string' ? searchParams.criteria : undefined;

  let data: CnelPayload | undefined = undefined;
  let blackouts: Blackout | undefined = undefined;
  let flag: boolean = false;

  if (document && criteria) {
    try {
      data = await fetchBlackout(document, criteria);
    } catch (_: any) {
      flag = true;
    }
  }

  if (data) {
    blackouts = data.notificaciones
      .reduce((prev, curr) => [...prev, ...curr.detallePlanificacion], [] as PlanificationDetail[])
      .reduce((prev, curr) => {
        const currentDate = dayjs(curr.fechaHoraCorte).format('YYYY-MM-DD');
        const existing = prev[currentDate] ? prev[currentDate] : [];
        return {
          ...prev,
          [currentDate]: [...existing, { from: curr.horaDesde, to: curr.horaHasta }]
        }
      }, {} as Blackout);
  }

  const dates: Date[] = blackouts ? Object.keys(blackouts).map(e => dayjs(e).toDate()) : [];

  return (
    <main className="w-screen h-screen p-4">
      <div className="h-full flex flex-col md:grid md:grid-cols-3 gap-x-4 gap-y-8">
        <div className="relative flex flex-col w-full md:col-span-2 justify-center items-center h-[185px] md:h-full">
          <Lightbulb blackout={blackouts ? blackouts[dayjs().format('YYYY-MM-DD')] : []} />
        </div>
        <div className='relative h-full'>
          <ScrollArea className='!absolute top-0 left-0 right-0 bottom-0'>
            <div className='w-full relative flex flex-col gap-y-4 px-4'>
              <Card>
                <CardContent className='p-4'>
                  <BlackoutForm
                    document={document}
                    criteria={criteria} />
                </CardContent>
              </Card>
              {flag
                ? <p>No se encontraron datos con los criterios ingresados</p>
                : blackouts && (
                  <CalendarProvider>
                    <div className="w-fit mt-4 max-w-full mx-auto flex">
                      <BlackoutCalendar dates={dates} />
                    </div>
                    <Card>
                      <CardHeader>
                        <CardTitle>
                          <BlackoutText />
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <BlackoutTable data={blackouts} />
                      </CardContent>
                    </Card>
                  </CalendarProvider>
                )}
              {data && (
                <Card>
                  <CardContent className='py-4'>
                    <p><span className='font-bold'>Alimentador:</span> {data.notificaciones[0].alimentador}</p>
                    <p><span className='font-bold'>Direccion:</span> {data.notificaciones[0].direccion}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </main>
  );
}

export default HomePage;