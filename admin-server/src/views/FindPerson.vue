<template>
    <div class="body">
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="openid" label="OpenID" >
            </el-table-column>
            <el-table-column prop="classify1" label="一级分类" >
            </el-table-column>
            <el-table-column prop="classify2" label="二级分类">
            </el-table-column>
            <el-table-column prop="name" label="名字">
            </el-table-column>
            <el-table-column prop="date" label="丢失时间">
            </el-table-column>
            <el-table-column prop="region" label="丢失地点">
            </el-table-column>
            <el-table-column prop="call" label="联系方式">
            </el-table-column>
            <el-table-column prop="desc" label="描述">
            </el-table-column>
            <el-table-column  label="相关图片">
                <template slot-scope="">

                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
            :page-sizes="[5, 10, 15, 20]" :page-size="size" layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }],
            page: 1,
            size: 5,
            total: 0
        }
    },
    methods: {
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        }
    },
}
</script>

<style lang="less" scoped>
.body {
    padding: 20px;
    background-color: #fff;
    border-radius: 20px;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
}
</style>