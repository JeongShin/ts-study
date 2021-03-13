import sampleData from "../sample.json";
import { IAdvertisement, ICatPost } from "../components/Post";

export interface IResponse {
  page: number,
  totalPages: number,
  data: Array <ICatPost | IAdvertisement>,
}

export async function fetchSampleData(page: number): Promise<IResponse> {
  const perPage = 50;
  const from = (page - 1) * perPage;
  const to = from + perPage;

  return new Promise((resolve, reject) => {
    if (page > 0) {
      setTimeout(() => {
        const pageCount = (sampleData.length / perPage);
        resolve({
          page: page,
          data: sampleData.slice(from, to) as Array<ICatPost | IAdvertisement>,
          totalPages: Math.floor(pageCount) + ((pageCount - Math.floor(pageCount)) > 0 ? 1 : 0),
        })
      }, 700);
    } else {
      reject(new Error("데이터 로드에 실패 하였습니다. "))
    }
  })
}
