import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import TaskCard from "../components/TaskCard";
import { ColumnProps, screenHeight, screenWidth } from "../types/Types";

export default function Column({ title, tasks, color, onEditTask , onDeleteTask}: ColumnProps) {

  return (
    

    <View style={styles.column}>
      <Text style={styles.title}>{title}</Text>

      <ScrollView style={styles.taskContainer} >
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} color={color}  onEditTask={onEditTask}   onDeleteTask={onDeleteTask}/>
      ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  column: {
    width: screenWidth * 0.95,
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
    padding: 12,
    marginRight: 12,
    minHeight: 400,
    maxHeight: screenHeight * 0.75,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 30,
  },
  taskContainer: {
    maxHeight:screenHeight * 0.75,
    
  },
});
