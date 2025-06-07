const BASE_URL = "https://provinces.open-api.vn/api";

// Lấy tất cả tỉnh thành
export async function getProvinces() {
  const res = await fetch(`${BASE_URL}/p/`);
  if (!res.ok) throw new Error("Không thể lấy danh sách tỉnh thành");
  return res.json();
}

// Lấy tất cả quận/huyện của một tỉnh (có đầy đủ các trường)
export async function getDistrictsOfProvince(provinceCode: string | number) {
  const res = await fetch(`${BASE_URL}/p/${provinceCode}?depth=2`);
  if (!res.ok) throw new Error("Không thể lấy quận/huyện");
  const data = await res.json();
  return data.districts; 
}

// Lấy xã/phường của quận/huyện
export async function getWardsOfDistrict(districtCode: string | number) {
  const res = await fetch(`${BASE_URL}/d/${districtCode}?depth=2`);
  if (!res.ok) throw new Error("Không thể lấy xã/phường");
  const data = await res.json();
  return data.wards; 
}

// Lấy 1 tỉnh thành cụ thể (chi tiết)
export async function getProvinceDetail(provinceCode: string | number) {
  const res = await fetch(`${BASE_URL}/p/${provinceCode}`);
  if (!res.ok) throw new Error("Không tìm thấy tỉnh thành");
  return res.json();
}
