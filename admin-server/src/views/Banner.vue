<template>
    <div class="body">
        <div class="top">
            <h2>轮播图管理</h2>
            <el-button @click="dialogVisible = true">添加</el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="id" label="ID">
            </el-table-column>
            <el-table-column prop="title" label="标题">
            </el-table-column>
            <el-table-column prop="index" label="索引">
            </el-table-column>
            <el-table-column prop="imgurl" label="图片地址">
            </el-table-column>
            <el-table-column prop="time" label="创建时间">
            </el-table-column>
            <el-table-column prop="desc" label="描述">
            </el-table-column>
            <el-table-column prop="edit" label="操作">
                <template slot-scope="scope">
                    <el-button slot="reference" type="primary" @click="updataItem(scope.row)">修改</el-button>
                    <el-popconfirm title="重要数据，确认删除?" @confirm="deleteData(scope.row.id)">
                        <el-button type="danger" slot="reference">删除</el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>

        <!-- 新增轮播对话框 -->
        <el-dialog :close-on-click-modal="false" @close="handleClose" title="添加轮播图" :visible.sync="dialogVisible"
            width="30%">
            <span>标题</span>
            <el-input class="margin" placeholder="请输入标题" v-model="title" clearable>
            </el-input>

            <span>索引</span>
            <el-input class="margin" placeholder="请输入索引" v-model="index"></el-input>

            <span>上传轮播图</span>
            <el-upload class="upload-demo" action="http://127.0.0.1:8082/uploadImg" :on-remove="handleRemove" multiple
                :limit="1" :file-list="fileList" :on-success="uploadSuccess">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件,且不超过500kb</div>
            </el-upload>

            <el-input class="margin" v-model="desc" placeholder="请输入描述">
            </el-input>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addbanner()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [],
            dialogVisible: false,
            title: '',
            index: 0,
            fileList: [],
            desc: '',
            id: ''
        }
    },
    created() {
        this.getTabData();
    },
    methods: {
        async updataItem(item) {
            console.log(item);

            const { title, index, imgurl, desc, id } = item
            this.title = title
            this.index = index
            this.fileList = [{
                name: title,
                url: imgurl
            }]
            this.desc = desc
            this.id = id
            this.dialogVisible = true
        },

        async addbanner() {
            const { title, index, fileList, desc, tableData, id } = this;
            const params = {
                title,
                index: Number(index),
                imgurl: fileList[0].url,
                desc,
                id
            }

            if (!title.trim() || fileList.length === 0) {
                this.$message.error('请填写完整信息')
                return;
            }
            
            if (id) {
                if (tableData.find(item => item.index === index && item.id !== id)) {
                    this.$message.error('索引重复');
                    return
                }
            } else {
                if (tableData.find(item => item.index === index)) {
                    this.$message.error('索引重复');
                    return
                }
            }

            if (!(Number(index) >= 0)) {
                this.$message.error('索引必须为正整数');
                return;
            }

            if (id) {
                const result = await this.$http.post('/getapi/updbanner', params)
                console.log(result.data);
                if (result.data.message === 'Success') {
                    this.$message.success('修改成功')
                    this.handleClose();
                    this.getTabData();
                    return;
                } else {
                    this.$message.error('修改失败')
                    return;
                }
            } else {
                const result = await this.$http.post('/getapi/pushbanner', params)
                console.log(result.data);
                if (result.data.message == 'Success') {
                    this.$message.success('添加成功')
                    this.handleClose();
                    this.getTabData();
                } else {
                    this.$message.error('添加失败')
                }
            }
        },

        handleRemove() {
            this.fileList = [];
        },

        uploadSuccess(response) {
            const { filename, originalname } = response.data[0]
            console.log(response.data);

            this.fileList = [
                {
                    name: originalname,
                    url: `http://127.0.0.1:8082/${filename}`
                }
            ]
        },

        handleClose() {
            this.title = '',
                this.index = 0,
                this.fileList = [],
                this.desc = '',
                this.dialogVisible = false
            this.id = ''
        },

        async getTabData(search) {
            const result = await this.$http.post('/getapi/pullbanner')
            const { data } = result.data
            this.tableData = data
        },

        async deleteData(id) {
            const params = { id };
            console.log(params);
            if (id) {
                const result = await this.$http.post('/getapi/delbanner', params)
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