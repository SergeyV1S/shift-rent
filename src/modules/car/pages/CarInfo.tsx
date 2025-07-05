import { useParams } from "react-router";

import { PATHS } from "@shared/constants";
import { createRoute } from "@shared/lib";

const CarInfoPage = () => {
  const { carId } = useParams() as { carId: string };

  return <div className=''>{carId}</div>;
};

export const carInfoRoute = createRoute(`${PATHS.CAR}/:carId`, <CarInfoPage />);
