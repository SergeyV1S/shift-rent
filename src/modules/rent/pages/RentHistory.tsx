import { useEffect } from "react";
import { Link } from "react-router";

import { PATHS } from "@shared/constants";
import { formatDateRangeFromNumber } from "@shared/helpers";
import { cn, createRoute } from "@shared/lib";
import {
  Spinner,
  Table,
  TableCell,
  TableContent,
  TableHeader,
  TableRow,
  Typography,
  typographyVariants
} from "@shared/ui";

import { rentStatusTranslation } from "../constants";
import { useRentHistoryStore } from "../model";

export const RentHistoryPage = () => {
  const { rentHistory, isLoading, fetchRentHistory } = useRentHistoryStore();

  useEffect(() => {
    fetchRentHistory();
  }, []);

  return (
    <div className='space-y-6'>
      <Typography variant='title_h2' tag='h1'>
        Заказы
      </Typography>
      <Table>
        <TableHeader>
          <TableCell>Автомобиль</TableCell>
          <TableCell>Даты брони</TableCell>
          <TableCell>Статус брони</TableCell>
        </TableHeader>
        <TableContent>
          {!isLoading &&
            // Fix
            rentHistory.map((rent) => (
              <TableRow key={rent._id}>
                <TableCell>{rent.carInfo.name}</TableCell>
                <TableCell>{formatDateRangeFromNumber(rent.startDate, rent.endDate)}</TableCell>
                <TableCell className='flex items-center gap-3'>
                  <>
                    <div
                      className='size-2 rounded-full'
                      style={{ backgroundColor: rentStatusTranslation[rent.status].color }}
                    />
                    {rentStatusTranslation[rent.status].value}
                  </>
                </TableCell>
                <TableCell>
                  <Link
                    className={cn(
                      typographyVariants(),
                      "border-b-content-06 text-content-06 hover:text-brand-primary/80 border-b pb-0.5 transition-colors duration-300"
                    )}
                    to={`${PATHS.RENT_HISTORY}/${rent._id}`}
                  >
                    Подробнее
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          {isLoading && <Spinner />}
        </TableContent>
      </Table>
    </div>
  );
};

export const rentHistoryRoute = createRoute(PATHS.RENT_HISTORY, <RentHistoryPage />);
