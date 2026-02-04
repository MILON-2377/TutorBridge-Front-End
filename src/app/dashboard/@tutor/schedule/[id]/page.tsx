import { TutorService } from "@/src/service/tutor/tutor.service";
import { UpdateRulesClient } from "@/src/components/tutor/UpdateRulesClient";
import { redirect } from "next/navigation";

export default async function EditRulePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const result = await TutorService.getAvailabilityById(id);

  if (!result.success || !result.availability) {
    redirect("/dashboard/rules");
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <UpdateRulesClient initialData={result.availability} ruleId={id} />
    </div>
  );
}
