import Loading from "@/components/Loading";
import { TouchableOpacity, View, StyleSheet, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { Badge, BadgeText } from "@/components/ui/badge";
import { Input, InputField, InputSlot } from "@/components/ui/input";
import { Feather } from "@expo/vector-icons";
import { colors } from "@/theme/colors";
import { useActiveTheme } from "@/hooks/useActiveTheme";
import { Text } from "@/components/ui/text";

const items = [
  { id: 1, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", tags: ["lorem", "ipsum"] },
  { id: 2, text: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", tags: ["sed", "tempor"] },
  { id: 3, text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.", tags: ["ut", "laboris"] },
  { id: 4, text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.", tags: ["duis", "cillum"] },
  { id: 5, text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa.", tags: ["excepteur", "culpa"] },
  { id: 6, text: "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio.", tags: ["curabitur", "pretium"] },
  { id: 7, text: "Nullam varius, turpis et commodo pharetra, est eros bibendum elit.", tags: ["nullam", "varius"] },
  { id: 8, text: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices.", tags: ["vestibulum", "luctus"] },
  { id: 9, text: "Morbi in sem quis dui placerat ornare. Pellentesque odio nisi.", tags: ["morbi", "placerat"] },
  { id: 10, text: "Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue.", tags: ["praesent", "cursus"] },
];

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [inputText, setInputText] = useState("");
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);
  const router = useRouter();
  const activeTheme = useActiveTheme();

  const allTags = [...new Set(items.flatMap(item => item.tags))];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loading />;

  // Filter items berdasarkan search dan tag
  const filteredItems = items.filter(item => {
    const matchesSearch = item.text.toLowerCase().includes(search.toLowerCase());
    const matchesTag = selectedTag ? item.tags.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  const handleSearchSubmit = () => {
    setSearch(inputText);
  };

  const handleClearSearch = () => {
    setInputText("");
    setSearch("");
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{
        marginTop: -10,
        backgroundColor: activeTheme === 'dark'
          ? colors.dark.backgroundColor
          : colors.light.backgroundColor,
      }}>
        <Input variant="underlined" size="xl" style={{ margin: 10 }}>
          <InputSlot className="px-3">
            <Feather name="search" size={18} color={activeTheme === 'dark' ? '#fff' : '#000'} />
          </InputSlot>
          <InputField
            placeholder="Search..."
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={handleSearchSubmit}
            returnKeyType="search"
          />
          <InputSlot className="px-3">
            <Feather name="x" size={18} color={activeTheme === 'dark' ? '#fff' : '#000'} onPress={handleClearSearch} />
          </InputSlot>
        </Input>
      </View>

      <View style={{
        maxHeight: 50, minHeight: 50, backgroundColor: activeTheme === 'dark'
          ? colors.dark.backgroundColor
          : colors.light.backgroundColor,
        borderBottomColor: activeTheme === 'dark'
          ? colors.dark.borderColor
          : colors.light.borderColor,
        borderBottomWidth: 0.2,
      }}>
        {/* Tags */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingVertical: 10, paddingHorizontal: 5 }}>
          <View style={{ flexDirection: "row", gap: 8, paddingHorizontal: 5 }}>
            {allTags.map(tag => {
              const isActive = selectedTag === tag;
              return (
                <TouchableOpacity key={tag} onPress={() => setSelectedTag(isActive ? null : tag)}>
                  <Badge
                    size="md"
                    variant="outline"
                    className={`rounded-full ${isActive && `bg-[${activeTheme === 'dark' ? '#a2ddfa' : '#ecf8fe'}] border-[#0973a8]`}`}
                  >
                    <BadgeText className={`${isActive && 'text-[#0973a8]'}`}>{tag}</BadgeText>
                  </Badge>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {filteredItems.map(({ id, text }) => (
          <View key={id} style={[styles.card, colors[activeTheme]]}>
            <TouchableOpacity onPress={() => router.push(`/item/${id}`)}>
              <Text style={{ fontWeight: "bold" }}>Item {id}</Text>
              <Text>{text}</Text>
            </TouchableOpacity>
          </View>
        ))}
        {filteredItems.length === 0 && (
          <View style={{ padding: 20, alignItems: "center" }}>
            <Text>No items found.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 10,
    gap: 5,
  },
  card: {
    padding: 20,
    borderWidth: 0.2,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderRadius: 0,
  },
});