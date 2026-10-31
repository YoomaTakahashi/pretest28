<template>
    <v-container>
        <v-card>
           <v-sheet elevation="5" rounded class="pa-4" >
            <h1 class="font-weight-bold text-center">DashBoard - Evaluatee</h1>
            <v-card-text >
                <v-row>
                    <v-col cols="12" md="4" v-for="b in box" :key="b">
                        <v-card elevation="5" rounded="5" class="rounded py-2">
                            <div class="pa-1 text-center text-h5">{{ b.title }}</div>
                            <div class="pa-1 text-center text-h5">{{ b.value }}</div>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card-text>
           </v-sheet> 
        </v-card>

        <v-card elevation="5" rounded class="mt-4">
           <v-sheet elevation="5" rounded class="pa-4" >
            <h1 class="font-weight-bold text-center">รอบการประเมินทั้งหมด</h1>
            <v-table class="table">
                <tr>
                    <th class="bg-grey border pa-2" style="width: 10%;">ลำดับ</th>
                    <th class="bg-grey border pa-2" style="width: 10%;">ขื่อ-นามสุกล</th>
                    <th class="bg-grey border pa-2" style="width: 10%;">รอบการประเมินท้งหมด</th>
                    <th class="bg-grey border pa-2" style="width: 10%;">ปีการประเมิน</th>
                </tr>
                <tr v-for="(item,index) in result" :key="item">
                    <td class="border pa-2 text-center" style="width: 10%;">{{ 1 }}</td>
                    <td class="border pa-2 text-center" style="width: 10%;">{{ item.fname }}-{{ item.lname }}</td>
                    <td class="border pa-2 text-center" style="width: 10%;">{{ item.round_sys }}</td>
                    <td class="border pa-2 text-center" style="width: 10%;">{{ item.year_sys }}</td>
                </tr>
            </v-table>
           </v-sheet> 
        </v-card>
    </v-container>
</template>

<script setup lang="ts">
import { api,eva } from '~/API/base';
import axios from 'axios';

const box = ref([])
const result = ref<any>([])

const fecth = async()=>{
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${api}/dash/eva`,{headers:{Authorization:`Bearer ${token}`}})
        box.value = res.data.box
        console.log(res)
    } catch (error) {
        console.error('Error get profile',error)
    }
}
const fecthR = async()=>{
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${eva}/table`,{headers:{Authorization:`Bearer ${token}`}})
        result.value = res.data
        console.log(res)
    } catch (error) {
        console.error('Error get profile',error)
    }
}
onMounted(async()=>{
    await Promise.all([fecth(),fecthR()])
})
</script>

<style scoped>
.rounded{
    border-radius: 24px !important;
}
</style>