import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "@/store/themeSlice";
import {
  RadioGroup,
  Radio,
  RadioIndicator,
  RadioLabel,
  RadioIcon,
} from "@/components/ui/radio";

import {
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { CircleIcon } from "@/components/ui/icon";
import { Platform } from "react-native";
import { useActiveTheme } from "@/hooks/useActiveTheme";

export default function ThemeSwitcher() {
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.theme);
  const activeTheme = useActiveTheme();

  return (
    <VStack space="md" p="$4">
      <RadioGroup value={mode} onChange={(val) => dispatch(setTheme(val))}>
        <VStack space="md">
          {/* System */}
          {Platform.OS === "web" && (
            <Radio value="system">
              <HStack space="md" flex={1}>
                <HStack space="md">
                  <MaterialCommunityIcons name="circle-half-full" size={20} color={activeTheme === 'dark' ? '#fff' : '#000'} />
                  <RadioLabel>Automatic</RadioLabel>
                </HStack>
                <RadioIndicator>
                  <RadioIcon as={CircleIcon} />
                </RadioIndicator>
              </HStack>
            </Radio>
          )}

          {/* Light */}
          <Radio value="light">
            <HStack space="md" flex={1}>
              <HStack space="md">
                <MaterialIcons name="light-mode" size={20} color={activeTheme === 'dark' ? '#fff' : '#000'} />
                <RadioLabel>Light</RadioLabel>
              </HStack>
              <RadioIndicator>
                <RadioIcon as={CircleIcon} />
              </RadioIndicator>
            </HStack>
          </Radio>

          {/* Dark */}
          <Radio value="dark">
            <HStack space="md" flex={1}>
              <HStack space="md">
                <MaterialIcons name="dark-mode" size={20} color={activeTheme === 'dark' ? '#fff' : '#000'} />
                <RadioLabel>Dark</RadioLabel>
              </HStack>
              <RadioIndicator>
                <RadioIcon as={CircleIcon} />
              </RadioIndicator>
            </HStack>
          </Radio>
        </VStack>
      </RadioGroup>
    </VStack>
  );
}
