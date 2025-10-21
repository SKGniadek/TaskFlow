import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { TaskCardProps, screenHeight } from "../types/Types";


export default function TaskCard({ task, color, onEditTask, onDeleteTask}: TaskCardProps) {

  
const [AddTaskEditWindow, SetAddTaskEditWindow] = useState(false);
const [confirmDelete, setConfirmDelete] = useState(false);

useEffect(() => {
  if (AddTaskEditWindow) {
    setTaskTitleLocal(task.title);
    setTaskDescLocal(task.description);
    setPriorityLocal(task.priority);
    setStatusLocal(task.status);
  }
}, [AddTaskEditWindow, task]);
  
    const [taskTitleLocal, setTaskTitleLocal] = useState(task.title); 
    const [taskDescLocal, setTaskDescLocal] = useState(task.description);
    const [priorityLocal, setPriorityLocal] = useState(task.priority);
    const [statusLocal, setStatusLocal] = useState(task.status);

 const editTask = () => {
  onEditTask({
    ...task,
    title: taskTitleLocal,
    description: taskDescLocal,
    status: statusLocal,
  });
  SetAddTaskEditWindow(false);
};

const statusOptions = [
  { label: "To do", value: 1 },
  { label: "In Progress", value: 2 },
  { label: "Done", value: 3 },
];
  return (
    <View style={styles.card}>
      
        <Modal
        visible={AddTaskEditWindow}
        animationType="slide"
        transparent={true}
        onRequestClose={() => SetAddTaskEditWindow(false)}
        >
        <View    style={{
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
            <Text style={{ color: "#fff", fontSize: 18, textAlign: "center" }}>Edit Task</Text>
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
            value={taskTitleLocal}
            onChangeText={text => setTaskTitleLocal(text)}
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
            value={taskDescLocal}
            onChangeText={text => setTaskDescLocal(text)}
            multiline={true}
            scrollEnabled = {true}
            numberOfLines={5}
            />

              <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 12 }}>
            {statusOptions.map(({label, value}) => (
            <TouchableOpacity
            key={value}
            onPress={() => setStatusLocal(value)}
            style={{
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 8, 
            backgroundColor: 
            statusLocal === 1 && value === 1 ? "#ef4444" + "83"
            : statusLocal === 2 && value === 2 ? "#f59e0b" + "83"  
            : statusLocal === 3 && value === 3 ? "#22c55e" + "83": "#333",
            
      }}
    >
      <Text style={{ color: "#fff", fontWeight: "600" }}>{label}</Text>
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
              editTask();
            
            }}>
              <Text style={{ color: "#fff", fontSize: 15}}>Edit task</Text>
            </TouchableOpacity>

              <TouchableOpacity style={styles.addButton} onPress={() => SetAddTaskEditWindow(false)} >
              <Text style={{ color: "#fff", fontSize: 15}}>Close</Text>
            </TouchableOpacity>

         
            </View>
            
          </View>
        </View> 
      </Modal>



      <Text style={styles.title} numberOfLines={1} >{task.title}</Text>
      <Text style={styles.desc} numberOfLines={1}>{task.description}</Text>
      <View style={styles.row}>
        
        <View style={[styles.badge, { backgroundColor: color + "33" }]}>
          <Text style={[styles.badgeText, { color }]}>{task.priority}</Text>
        </View>

        
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => SetAddTaskEditWindow(true)}>
            <Text style={[styles.actionText, { color: "#ade274ff" }]}>More</Text>
          </TouchableOpacity>

          {task.status === 3 && (
        <TouchableOpacity onPress={() => {
          if (!confirmDelete) {
            setConfirmDelete(true);
            setTimeout(() => setConfirmDelete(false), 2000);
          } else {
            onDeleteTask(task.id);
          }
        }}
              
            >
        <Text style={[styles.actionText, { color: "#c66262ff" }]}>{confirmDelete ? "Delete?" : "Delete" }</Text>
        </TouchableOpacity>
)}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#2a2a2a",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  title: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 8,
  },
  desc: {
    color: "#817f7fff",
    fontSize: 14,
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  badge: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  badgeText: {
    fontWeight: "700",
  },
  actions: {
    flexDirection: "row",
    gap: 12,
  },
  actionText: {
    color: "#ddd",
    fontWeight: "600",
  },
   addButton: {
    backgroundColor: "#313234ff",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 999,
    marginBottom: 10,
  },
});
