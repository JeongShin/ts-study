import sampleData from "./sample.json";

export default async function fetchSampleData(page) {
  const perPage = 50;
  const from = (page - 1) * perPage;
  const to = from + perPage;

  return new Promise((resolve, reject) => {
    if (page > 0) {
      resolve({
        page: page,
        data: sampleData.slice(from, to),
        total_pages: ~~(sampleData.length / perPage) + (((sampleData.length / perPage) - ~~(sampleData.length / perPage)) > 0 ? 1 : 0),
      })
    }

    reject(new Error("데이터 로드에 실패 하였습니다. "))
  })
}
