export interface IAggregationChartProfile {
  month: string;
  male: number;
  female: number;
  result: {
    month: string;
    male: number;
    female: number;
  };
}

export type AggregationResultItem = {
  name: string;
  value: number;
  description?: string;
};

export type ApplicationAggregation = {
  name: string | undefined;
  description: string | undefined;
  status: string;
  result: AggregationResultItem[];
};

export type ApplicationState = ApplicationAggregation;

export interface IAggregationChartProfile {
  month: string;
  male: number;
  female: number;
  result: {
    month: string;
    male: number;
    female: number;
  };
}
