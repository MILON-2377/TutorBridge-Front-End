import { cookies } from "next/headers";

export interface Categories {
  id: string;
  name: string;
  description: string;
}

interface CategoriesResponse {
  success: boolean;
  message: string;
  data: {
    data: Categories[];
  };
}

const getCategories = async () => {
  try {
    const cookieStore = await cookies();

    const cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");

    if (!cookieHeader) {
      return {
        success: true,
      };
    }

    const response = await fetch(`${process.env.AUTH_BASE_URL}/categories`, {
      headers: {
        cookie: cookieHeader,
      },
    });

    if (!response.ok) {
      return null;
    }

    const data: CategoriesResponse = await response.json();

    return {
      categories: data.data,
    };
  } catch (error) {
    console.error("Get categories error", error);
  }
};

export const CategoryService = {
  getCategories,
};
