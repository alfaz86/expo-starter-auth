import Loading from "@/components/Loading";
import { TouchableOpacity, View, Text, StyleSheet, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

const items = [
  { id: 1, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { id: 2, text: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { id: 3, text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris." },
  { id: 4, text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum." },
  { id: 5, text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa." },
  { id: 6, text: "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio." },
  { id: 7, text: "Nullam varius, turpis et commodo pharetra, est eros bibendum elit." },
  { id: 8, text: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices." },
  { id: 9, text: "Morbi in sem quis dui placerat ornare. Pellentesque odio nisi." },
  { id: 10, text: "Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue." },
];

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {items.map(({ id, text }) => (
        <View key={id} style={styles.card}>
          <TouchableOpacity onPress={() => router.push(`/item/${id}`)}>
            <Text>Item {id}</Text>
            <Text>{text}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 100,
    gap: 5,
  },
  card: {
    padding: 20,
    backgroundColor: '#fff',
    borderColor: '#d8d8d8',
    borderWidth: 0.2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  stepText: {
    fontSize: 14,
    marginBottom: 10,
    marginTop: 5,
    textAlign: "center"
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
    borderRadius: 4
  },
  buttons: { flexDirection: "row", justifyContent: "space-between", marginTop: 20 },
  error: { color: "red" }
});