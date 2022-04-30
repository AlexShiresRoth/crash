import api from "../utils/api";

type MetaProps = {
  event_source_url: string;
  emailHash: string | null;
  phoneHash: string | null;
  content_name: string;
  value: number;
  content_ids: Array<string> | null;
  event_name: "ViewContent" | "Purchase" | "AddToCart" | "PageView";
};

export const metaEvent = async ({
  event_source_url,
  emailHash,
  phoneHash,
  content_name,
  value,
  content_ids,
  event_name,
}: MetaProps) => {
  const config = {
    data: [
      {
        event_name,
        event_source_url,
        user_data: {
          em: [emailHash],
          ph: [phoneHash],
        },
        custom_data: {
          currency: "USD",
          content_name,
          value,
          content_ids,
          content_type: "product",
        },
      },
    ],
  };

  try {
    const apiRequest = await api.post("/meta/event", config);

    console.log("apiRequest", apiRequest.data);
  } catch (error) {
    console.error(error);
    return error;
  }
};
