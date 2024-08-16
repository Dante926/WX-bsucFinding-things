<template>
    <div class="body">
        <div class="top">
            <h2>意见反馈管理</h2>
        </div>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="id" label="ID">
            </el-table-column>
            <el-table-column prop="openid" label="OpenID">
            </el-table-column>
            <el-table-column prop="name" label="称呼">
            </el-table-column>
            <el-table-column prop="contact" label="联系方式">
            </el-table-column>
            <el-table-column prop="feedback" label="反馈内容">
            </el-table-column>
            <el-table-column prop="time" label="反馈时间">
            </el-table-column>
            <el-table-column prop="edit" label="操作">
                <template slot-scope="scope">
                    <el-popconfirm title="重要数据，确认删除?" @confirm="deleteData(scope.row.id)">
                        <el-button type="danger" slot="reference">删除</el-button>
                    </el-popconfirm>
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
            tableData: [],
            page: 1,
            size: 5,
            total: 0,
            search: ''
        }
    },
    created() {
        this.getTabData();
    },
    methods: {
        async getTabData(search) {
            const params = {
                page: this.page,
                size: this.size
            }
            const result = await this.$http.post('/getapi/pulladvice', params)
            const { data, total } = result.data
            console.log(data);

            // 将data里的字符串数组转换成真正的数组
            this.tableData = data
            this.total = total
        },
        async deleteData(id) {
            const params = { id };
            console.log(params);
            if (id) {
                const result = await this.$http.post('/getapi/deladvice', params)
                console.log(result);
                if (result.data.message == 'Success') {
                    // 提示删除成功
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.getTabData();
                } else {
                    this.$message({
                        message: '删除失败',
                        type: 'error'
                    });
                    this.getTabData();
                }
            } else {
                // 提示数据出错
                this.$message.error('数据出错')
                this.getTabData();
            }

        },
        handleSizeChange(val) {
            if (this.search) {
                this.size = val;
                this.getTabData(this.search);
            } else {
                this.size = val;
                this.getTabData();
            }

        },
        handleCurrentChange(val) {
            if (this.search) {
                this.page = val;
                this.getTabData(this.search);
            } else {
                this.page = val;
                this.getTabData();
            }
        },

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


    .top {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;

        .el-input {
            width: 200px;
        }

        .el-input__icon {
            height: auto;
        }
    }
}
</style>