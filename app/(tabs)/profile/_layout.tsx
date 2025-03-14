import { Stack, Tabs } from 'expo-router'
import React from "react";
import { Platform, ViewStyle } from "react-native";
import { HapticTab } from "@/components/HapticTab";


const StackLayout = () => {
    return (
        <Stack screenOptions={{headerShown: false,}}>
            <Stack.Screen name='index' options={{ headerShown: false }}/>
            <Stack.Screen name='setting' options={{ headerShown: false }}/>

        </Stack>
    )
}

export default StackLayout