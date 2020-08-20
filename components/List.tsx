import React, { useEffect, useState } from 'react';
import { Text, View } from './Themed';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.db')

export default function List() {
  const [tasks, setTasks] = useState({})

  // Not using useEffect, since we want this to run whenever component re-renders
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * from tasks',
      [],
      (_, { rows }) => setTasks(rows._array),
      // rows._array might produce a false positive error in the editor,
      // i.e. editor shows error highlight, but code compiles just fine.
    );
  });

  return (
    <View>
      <Text>
        Contents:
      </Text>
      <Text>
        {JSON.stringify(tasks)}
      </Text>
    </View>
  )
}