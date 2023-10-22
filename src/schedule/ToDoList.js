import { useEffect, useRef } from 'react';
import { Alert, FlatList,  Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import dayjs from 'dayjs';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Ionicons } from '@expo/vector-icons';
import { getCalendarColumns, ITEM_WIDTH, statusBarHeight } from './util';
import { useCalendar } from './hook/use-calendar';
import { useTodoList } from './hook/use-todo-list';
import Calendar from './Calendar';
import Margin from './Margin';
import AddTodoInput from './AddTodoInput';
import { bottomSpace } from './util';

export default function TodoScreen() {
  const now = dayjs();
  const {
    selectedDate,
    setSelectedDate,
    isDatePickerVisible,
    showDatePicker,
    hideDatePicker,
    handleConfirm,
    subtract1Month,
    add1Month,
  } = useCalendar(now);
  const {
    todoList,
    filteredTodoList,
    input,
    setInput,
    toggleTodo,
    removeTodo,
    addTodo,
    resetInput,
  } = useTodoList(selectedDate);

  const columns = getCalendarColumns(selectedDate);

  const flatListRef = useRef(null);

  const onPressLeftArrow = subtract1Month;
  const onPressHeaderDate = showDatePicker;
  const onPressRightArrow = add1Month;
  const onPressDate = setSelectedDate;

  const ListHeaderComponent = () => (
    <View>
      <Calendar
        todoList={todoList}
        columns={columns}
        selectedDate={selectedDate}
        onPressLeftArrow={onPressLeftArrow}
        onPressHeaderDate={onPressHeaderDate}
        onPressRightArrow={onPressRightArrow}
        onPressDate={onPressDate}
      />
      <Margin height={15} />

      <View
        style={{ 
          width: 4, 
          height: 4, 
          borderRadius: 4 / 2,
          backgroundColor: "#a3a3a3",
          alignSelf: "center",
        }}
      />
      <Margin height={15} />
    </View>
  )
  const renderItem = ({ item: todo }) => {
    const isSuccess = todo.isSuccess;
    const onPress = () => toggleTodo(todo.id);
    const onLongPress = () => {
      Alert.alert("삭제하시겠습니까?", "", [
        {
          style: "cancel",
          text: "N"
        },
        {
          text: "Y",
          onPress: () => removeTodo(todo.id),
        }
      ])
    };
    return (
      <Pressable
        onPress={onPress}
        onLongPress={onLongPress}
        style={{ 
          flexDirection: "row",
          width: ITEM_WIDTH, 
          alignSelf: "center",
          paddingVertical: 10,
          paddingHorizontal: 5,
          borderBottomWidth: 0.2,
          borderColor: "#a6a6a6",
          
        }}>
        <Text style={{ flex: 1, fontSize: 14, color: "#595959" }}>{todo.content}</Text>

        <Ionicons 
          name="ios-checkmark" 
          size={17} 
          color={isSuccess ? "#595959" : "#bfbfbf"}
        />
      </Pressable>
    )
  }
  const scrollToEnd = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 300);
  }
  const onPressAdd = () => {
    addTodo();
    resetInput();
    scrollToEnd();
  }
  const onSubmitEditing = () => {
    addTodo();
    resetInput();
    scrollToEnd();
  }
  const onFocus = () => {
    scrollToEnd();
  };

 

  return (
    <Pressable 
      style={styles.container} 
    
      onPress={Keyboard.dismiss}
    >
    

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <>
          <FlatList
            ref={flatListRef}
            data={filteredTodoList}
            style={{ flex: 1 }}
            contentContainerStyle={{ 
              paddingTop: statusBarHeight + 30
            }}
            ListHeaderComponent={ListHeaderComponent}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />

          <AddTodoInput
            value={input}
            onChangeText={setInput}
            placeholder={`${dayjs(selectedDate).format('MM.D')}에 추가할 투두`}
            onPressAdd={onPressAdd}
            onSubmitEditing={onSubmitEditing}
            onFocus={onFocus}
          />
        </>
      </KeyboardAvoidingView>

      <Margin height={bottomSpace} />

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
