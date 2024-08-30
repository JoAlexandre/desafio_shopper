import GeminiAsk from "../components/GeminiAsk";
import ListMeasures from "../components/ListMeasures";
import UpdateMeasures from "../components/UpdateMeasures";
import Template from "../template/Template";

export function PageUpload() {
  return (
    <Template>
      <GeminiAsk/>
    </Template>
  )
}
export function PageList() {
  return (
    <Template>
      <ListMeasures/>
    </Template>
  )
}

export function PageUpdate() {
  return (
    <Template>
      <UpdateMeasures/>
    </Template>
  )
}