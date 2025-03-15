#!/bin/bash

# Update all UI components to use the new utils structure
echo "Updating UI component imports..."

# Find all files that import from @/lib/utils and update them
grep -l "import { cn } from \"@/lib/utils\"" src/components/ui/*.tsx | xargs sed -i '' 's/import { cn } from "@\/lib\/utils"/import { cn } from "@\/lib\/utils\/common"/g'

echo "Import updates completed!" 