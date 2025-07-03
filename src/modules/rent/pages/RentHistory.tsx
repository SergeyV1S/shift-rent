import { useEffect } from "react";

import {
  Spinner,
  Table,
  TableCell,
  TableContent,
  TableHeader,
  TableRow,
  Typography
} from "@shared/ui";

import { useRentHistoryStore } from "../model";

export const RentHistoryPage = () => {
  const { rentHistory, fetchRentHistory } = useRentHistoryStore();

  useEffect(() => {
    fetchRentHistory();
  }, []);

  return (
    <main className='space-y-6'>
      <Typography variant='title_h2' tag='h1'>
        Заказы
      </Typography>
      <Table>
        <TableHeader>
          <TableCell>
            <Typography>Автомобиль</Typography>
          </TableCell>
          <TableCell>
            <Typography>Даты брони</Typography>
          </TableCell>
          <TableCell>
            <Typography>Статус брони</Typography>
          </TableCell>
        </TableHeader>
        <TableContent>
          {rentHistory ? (
            rentHistory.map((rent) => (
              <TableRow>
                <TableCell>{rent.carInfo.name}</TableCell>
                <TableCell>{`${rent.startDate} - ${rent.endDate}`}</TableCell>
                <TableCell>{rent.status}</TableCell>
                <TableCell>Подробнее</TableCell>
              </TableRow>
            ))
          ) : (
            <Spinner />
          )}
        </TableContent>
      </Table>
    </main>
  );
};
