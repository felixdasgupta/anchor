import { atomWithStorage } from "jotai/utils";
import type { Settings } from "@/lib/domain/types";

export const settingsAtom = atomWithStorage<Settings>("anchor:settings", {
	discretionaryBudgetCents: 0,
	weeklyLimitCents: 0,
});
