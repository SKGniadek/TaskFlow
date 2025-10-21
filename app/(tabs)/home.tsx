import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState, } from "react";
import { Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import Column from '../components/Column';
import { Task, screenHeight, screenWidth } from "../types/Types";


export default function HomeScreen() {

  const editTask = (updatedTask: Task) => {
  const updatedTasks = tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
   setTasks(updatedTasks);
   saveTasks(updatedTasks);
  };

    const [taskTitle, setTaskTitle] = useState("");
    const [taskDesc, setTaskDesc] = useState("");
    const [priority, setPriority] = useState("");
    
  const [tasks, setTasks] = useState<Task[]>
  ([
  { id: 1, title: "Add First Task", description: "I need more tasks!", priority: "HIGH", status: 1 },
  ]);
  
  const TASKS_STORAGE_KEY = '@tasks_storage';

  const saveTasks = async (tasksToSave: Task[]) => {
  try {
    await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasksToSave));
  } catch (e) {
    console.error("Error saving tasks", e);
  }
};

const loadTasks = async () => {
  try {
    const savedTasks = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  } catch (e) {
    console.error("Error loading tasks", e);
  }
};

useEffect(() => {
  loadTasks();
}, []);



const deleteTask = (id: number | string) => {
   const updatedTasks = tasks.filter(task => task.id !== id);
  setTasks(updatedTasks);
  saveTasks(updatedTasks);
};

const addTasktoDo = () => {
  const newTask: Task = {
    id: Date.now(),
    title: taskTitle || "Empty",
    description: taskDesc || "Empty",
    priority: priority || "LOW",
    status:1,
  };
   const updatedTasks = [...tasks, newTask];
  setTasks(updatedTasks);
  saveTasks(updatedTasks);
};


const [AddTaskWindow, SetAddTaskWindow] = useState(false);

useEffect(() => {
  if (AddTaskWindow) {
    setTaskTitle("");
    setTaskDesc("");
    setPriority("");
  }
}, [AddTaskWindow]);

  return (
     <View style={styles.container}>                                 
            <View style={styles.header}>  
             <Modal
            visible={AddTaskWindow}
            animationType="slide"
            transparent={true}
            onRequestClose={() => SetAddTaskWindow(false)}
            >
                 <View style={{
                flex: 1,
                backgroundColor: "rgba(0,0,0,0.5)",
                justifyContent: "center",
                alignItems: "center",
                }}>
              <View style={{
               width: "85%",
               backgroundColor: "#222",
               padding: 20,
               borderRadius: 12,
               minHeight: screenHeight*0.6,
               maxHeight: screenHeight*0.6,
            }}>
            <Text style={{ color: "#fff", fontSize: 18, textAlign: "center" }}>Add Task</Text>
            <Text style={{ color: "#fff", fontSize: 15, textAlign: "left", padding:5,  }}>Title:</Text>
            <TextInput
    
              style={{
                width: "100%",
                height: "10%",
                backgroundColor: "#333",
                color: "#fff",
                padding: 10,
                borderRadius: 8,
                marginBottom: 12,
                minHeight: 20,
                textAlignVertical: "top"
              }}
            value={taskTitle}
            onChangeText={text => setTaskTitle(text)}
            />

            <Text style={{ color: "#fff", fontSize: 15, textAlign: "left", padding:5,  }}>Description:</Text>

            <TextInput
    
              style={{
                width: "100%",
                height: "25%",
                backgroundColor: "#333",
                color: "#fff",
                padding: 5,
                borderRadius: 8,
                marginBottom: 12,
                minHeight: 20,
                 textAlignVertical: "top"
              }}
            value={taskDesc}
            onChangeText={text => setTaskDesc(text)}
            multiline = {true}
            scrollEnabled = {true}
            numberOfLines={5}
            />

              <Text style={{ color: "#fff", fontSize: 15, textAlign: "center", padding:5,  }}>Priority:</Text>
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 12 }}>
            {["HIGH", "MEDIUM", "LOW"].map((level) => (
            <TouchableOpacity
            key={level}
            onPress={() => setPriority(level)}
            style={{
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 8, 
            backgroundColor: 
            priority === "HIGH" && level === "HIGH" ? "#ef4444" + "83"
            : priority === "MEDIUM" && level === "MEDIUM" ? "#f59e0b" + "83"  
            : priority === "LOW" && level === "LOW" ? "#22c55e" + "83": "#333",
            
      }}
    >
      <Text style={{ color: "#fff", fontWeight: "600" }}>{level}</Text>
    </TouchableOpacity>
  ))}
</View>

            <View style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            marginBottom: 12,
            marginTop: 50,
          }}>
                 <TouchableOpacity style={styles.addButton} onPress={() => {
                    addTasktoDo();
                    SetAddTaskWindow(false);
            }}>
              <Text style={{ color: "#fff", fontSize: 15}}>Add task</Text>
            </TouchableOpacity>

              <TouchableOpacity style={styles.addButton} onPress={() => SetAddTaskWindow(false)} >
              <Text style={{ color: "#fff", fontSize: 15}}>Close</Text>
            </TouchableOpacity>

         
            </View>
            
          </View>
        </View> 
      </Modal>
      <Image 
  source={require("../../assets/FT.png")} 
  style={{ width: 50, height: 50 }} 
/>
      <Text style={styles.appTitle}>TaskFlow</Text>
      </View>
      
      <View style={styles.header}>
        <TouchableOpacity
            style={styles.addButton}
            onPress={() => SetAddTaskWindow(true)}
            >
              <Text style={styles.addButtonText}>+ Add Task</Text>
            </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={{ paddingHorizontal: 10 }}
      >
        <Column title="To Do" tasks={tasks.filter(task => task.status === 1)} color="#ef4444"   onEditTask={editTask} onDeleteTask={deleteTask} /> 
        <Column title="In Progress" tasks={tasks.filter(task => task.status === 2)} color="#f59e0b"  onEditTask={editTask} onDeleteTask={deleteTask}/>
        <Column title="Done" tasks={tasks.filter(task => task.status === 3)} color="#22c55e"  onEditTask={editTask} onDeleteTask={deleteTask}/>
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({ 
  header: {
    flexDirection: "row", 
    justifyContent: "space-between",
    alignItems: "center", 
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingTop: 60,
  },
  appTitle: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "700",
    marginLeft: 0,
    marginBottom: 0,
    marginRight: screenWidth*0.38
  },
  addButton: {
    backgroundColor: "#313234ff",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 999,
    marginBottom: 10,
  },
  addButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});