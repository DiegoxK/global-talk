import type { PaymentDetails } from "types/epayco";

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const url_api = process.env.EPAYCO_API_URL;
const url_apify = process.env.EPAYCO_APIFY_URL;

const public_key = process.env.EPAYCO_API_KEY;
const private_key = process.env.EPAYCO_PRIVATE_KEY;

interface SessionResponse {
  success: boolean;
  titleResponse: string;
  textResponse: string;
  lastAction: string;
  data: {
    sessionId: string;
  };
}

interface Card {
  token: string;
  franchise: string;
  mask: string;
  created: string;
  default: boolean;
}

interface CardTokenResponse {
  success: boolean;
  titleResponse: string;
  textResponse: string;
  lastAction: string;
  data: {
    status: boolean;
    id: string;
    success: boolean;
    type: string;
    data: {
      status: string;
      id: string;
      created: string;
      livemode: boolean;
    };
    card: {
      exp_month: string;
      exp_year: string;
      name: string;
      mask: string;
    };
    object: string;
  };
}

interface ChargeSubscriptionParams {
  id_plan: string;
  customer: string;
  token_card: string;
  doc_type: string;
  doc_number: string;
  ip: string;
}

interface CreateCustomerResponse {
  success: boolean;
  titleResponse: string;
  textResponse: string;
  lastAction: string;
  data: {
    status: boolean;
    success: boolean;
    type: string;
    data: {
      status: string;
      description: string;
      customerId: string;
      email: string;
      name: string;
    };
    object: string;
  };
}

interface SubscriptionResponse {
  status: boolean;
  message: string;
  created: string;
  id: string;
  success: boolean;
  current_period_start: string;
  current_period_end: string;
  customer: {
    _id: string;
    name: string;
    email: string;
    doc_number: string;
    merchantId: string;
    indicative: string;
    country: string;
    city: string;
    address: string;
    break_card: boolean;
    doc_type: string;
    updated_at: string;
  };
  status_subscription: string;
  type: string;
  data: {
    idClient: string;
    name: string;
    description: string;
    amount: number;
    currency: string;
    interval: string;
    interval_count: number;
    trialDays: number;
    createdAt: string;
  };
  object: string;
}

interface GetSubscriptionResponse {
  status: boolean;
  created: string;
  id: string;
  sucess: boolean;
  current_period_start: string;
  current_period_end: string;
  customer: string;
  plan: {
    _id: string;
    idClient: string;
    name: string;
    description: string;
    amount: number;
    currency: string;
    interval: string;
    interval_count: number;
    status: string;
    trialDays: number;
  };
  status_plan: string;
  type: string;
  object: string;
}

interface GetCustomerResponse {
  success: boolean;
  titleResponse: string;
  textResponse: string;
  lastAction: string;
  data: {
    status: boolean;
    success: boolean;
    type: string;
    data: {
      id_customer: string;
      name: string;
      created: string;
      doc_type: string;
      doc_number: string;
      email: string;
      phone: string;
      address: string;
      cards: Card[];
    };
    object: string;
  };
}

interface CreateCardTokenParams {
  cardNumber: string;
  cardExpYear: string;
  cardExpMonth: string;
  cardCvc: string;
}

interface CreateCustomerParams {
  docType: string;
  docNumber: string;
  name: string;
  lastName: string;
  address: string;
  email: string;
  cellPhone: string;
  phone: string;
  requireCardToken: boolean;
  cardTokenId?: string;
}

interface CreateSubscriptionParams {
  id_plan: string;
  customer: string;
  token_card: string;
  doc_type: string;
  doc_number: string;
  url_confirmation: string;
  method_confirmation: string;
  extras_epayco: Record<string, string>;
  ip: string;
  test: string;
}

interface AuthToken {
  token?: string;
  bearer_token?: string;
}

export const getAuthToken = async (apify?: "apify") => {
  const credentials = Buffer.from(`${public_key}:${private_key}`).toString(
    "base64",
  );

  const requestOptions = {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: `Basic ${credentials}`,
    }),
    body: JSON.stringify(
      apify
        ? {}
        : {
            public_key: process.env.EPAYCO_API_KEY,
            private_key: process.env.EPAYCO_PRIVATE_KEY,
          },
    ),
    redirect: "follow" as RequestRedirect,
  };

  try {
    const response = await fetch(
      `${apify ? url_apify + "/login" : url_api + "/v1/auth/login"}`,
      requestOptions,
    );

    if (!response.ok) {
      throw new Error("Error en la solicitud");
    }

    const authToken: AuthToken = await response.json();

    return apify ? authToken?.token : authToken?.bearer_token;
  } catch (error) {
    console.error("Error getting the token:", error);
  }
};

export const createSession = async (params: PaymentDetails) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const token = await getAuthToken("apify");

  if (!token) {
    throw new Error("Failed to get auth token");
  }

  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(params),
    redirect: "follow" as RequestRedirect,
  };

  try {
    const response = await fetch(
      `${url_apify}/payment/session/create`,
      requestOptions,
    );

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const result: SessionResponse = JSON.parse(await response.text());

    if (result.success === false) {
      console.log(result.textResponse);
      throw new Error(result.textResponse);
    }

    console.log(result.data.sessionId);

    return result.data.sessionId;
  } catch (error) {
    console.error("Error getting the Session Id:", error);
  }
};

export const createCardToken = async (params: CreateCardTokenParams) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const token = await getAuthToken("apify");

  if (!token) {
    throw new Error("Failed to get auth token");
  }

  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(params),
  };

  try {
    const response = await fetch(`${url_apify}/token/card`, requestOptions);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const result: CardTokenResponse = JSON.parse(await response.text());

    if (result.success === false) {
      console.log(result.textResponse);
      throw new Error(result.textResponse);
    }

    console.log(result.data.id);

    return result.data.id;
  } catch (error) {
    console.error("Error getting the Card Token Id:", error);
  }
};

export const createCustomer = async (params: CreateCustomerParams) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const token = await getAuthToken("apify");

  if (!token) {
    throw new Error("Failed to get auth token");
  }

  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(params),
    redirect: "follow" as RequestRedirect,
  };

  try {
    const response = await fetch(`${url_apify}/token/customer`, requestOptions);

    console.log(`${url_apify}/token/customer`);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const result: CreateCustomerResponse = JSON.parse(await response.text());

    if (result.success === false) {
      console.error(result.textResponse);
      throw new Error(result.textResponse);
    }

    console.log(result);
    return result.data.data.customerId;
  } catch (error) {
    console.error("Error getting the customer id:", error);
  }
};

export const createSubscription = async (params: CreateSubscriptionParams) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const token = await getAuthToken();

  if (!token) {
    throw new Error("Failed to get auth token");
  }

  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(params),
  };

  try {
    const response = await fetch(
      `${url_api}/recurring/v1/subscription/create`,
      requestOptions,
    );

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const result: SubscriptionResponse = JSON.parse(await response.text());

    if (result.success === false) {
      console.error(result);
    }

    return result.id;
  } catch (error) {
    console.error("Error in the request", error);
  }
};

export const ChargeSubscription = async (params: ChargeSubscriptionParams) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const token = await getAuthToken();

  if (!token) {
    throw new Error("Failed to get auth token");
  }

  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(params),
  };

  try {
    const response = await fetch(
      `${url_api}/recurring/v1/subscription/create`,
      requestOptions,
    );

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const result = JSON.parse(await response.text());

    if (result.success === false) {
      console.error(result);
    }

    return result.id;
  } catch (error) {
    console.error("Error in the request", error);
  }
};

export const generateInvoiceCode = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const prefix =
    letters.charAt(Math.floor(Math.random() * 26)) +
    letters.charAt(Math.floor(Math.random() * 26)) +
    letters.charAt(Math.floor(Math.random() * 26));
  const number = Math.floor(Math.random() * 10000);
  const paddedNumber = number.toString().padStart(4, "0");

  return `${prefix}-${paddedNumber}`;
};

export const getSubscriptionById = async (id: string) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const token = await getAuthToken();

  if (!token) {
    throw new Error("Failed to get auth token");
  }

  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const response = await fetch(
      `${url_api}/recurring/v1/subscription/${id}/${process.env.EPAYCO_API_KEY}`,
      requestOptions,
    );

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const result: GetSubscriptionResponse = JSON.parse(await response.text());

    if (result.sucess === false) {
      console.error(result);
    }

    console.log(result);
    return result;
  } catch (error) {
    console.error("Error in the request", error);
  }
};

export const getCustomerById = async (id: string) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const token = await getAuthToken("apify");

  if (!token) {
    throw new Error("Failed to get auth token");
  }

  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({
      customerId: id,
    }),
  };

  try {
    const response = await fetch(
      `${url_apify}/subscriptions/customer`,
      requestOptions,
    );

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const result: GetCustomerResponse = JSON.parse(await response.text());

    if (result.success === false) {
      console.error(result);
    }

    console.log(result);
    return result;
  } catch (error) {
    console.error("Error in the request", error);
  }
};

export const validateIp = (ip: string) => {
  const ipRegex =
    /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

  const privateIpRanges = [
    /^0\..*/, // 0.0.0.0/8
    /^127\..*/, // 127.0.0.0/8
    /^10\..*/, // 10.0.0.0/8
    /^172\.(1[6-9]|2[0-9]|3[0-1])\..*/, // 172.16.0.0/12
    /^192\.168\..*/, // 192.168.0.0/16
  ];

  if (!ipRegex.test(ip)) return false;

  for (const range of privateIpRanges) {
    if (range.test(ip)) return false;
  }

  return true;
};
