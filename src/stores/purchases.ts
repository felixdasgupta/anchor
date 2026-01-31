import { atomWithStorage } from "jotai/utils";
import type { Purchase } from "@/lib/domain/types";

export const purchasesAtom = atomWithStorage<Purchase[]>("anchor:purchases", []);
