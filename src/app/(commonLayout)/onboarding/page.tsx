
export const dynamic = "force-dynamic";

import { OnboardingManager } from "@/src/components/onboarding/OnboardingManager";
import { CategoryService } from "@/src/service/category/category.service";

export default async function OnBoardingPage() {
  const response = await CategoryService.getCategories();
  const categories = response?.categories?.data;

  return (
    <div>
      <OnboardingManager categories={categories ? categories : []} />
    </div>
  );
}
