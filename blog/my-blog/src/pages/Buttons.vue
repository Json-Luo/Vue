<template>
  <div>
    <h3>默认按钮</h3>
    <p>
      <Button>Default</Button>
      <Button type="primary">Primary</Button>
      <Button type="dashed">Dashed</Button>
      <Button type="text">Text</Button>
      <Button type="info">Info</Button>
      <Button type="success">Success</Button>
      <Button type="warning">Warning</Button>
      <Button type="error">Error</Button>
    </p>

    <h3>幽灵按钮</h3>
    <p>
      <Button type="default" ghost>Default</Button>
      <Button type="primary" ghost>Primary</Button>
      <Button type="dashed" ghost>Dashed</Button>
      <Button type="text" ghost>Text</Button>
      <Button type="info" ghost>Info</Button>
      <Button type="success" ghost>Success</Button>
      <Button type="warning" ghost>Warning</Button>
      <Button type="error" ghost>Error</Button>
    </p>

    <h3>图形按钮以及按钮形状</h3>
    <p>
      <Button type="primary" shape="circle" icon="ios-search"></Button>
      <Button type="primary" icon="ios-search">Search</Button>
      <Button type="primary" shape="circle" icon="ios-search">Search</Button>
      <Button type="primary" shape="circle">Circle</Button>
      <Button shape="circle" icon="ios-search"></Button>
      <Button icon="ios-search">Search</Button>
      <Button shape="circle" icon="ios-search">Search</Button>
      <Button shape="circle">Circle</Button>
    </p>

    <h3>按钮尺寸</h3>
    <p>
      <RadioGroup v-model="buttonSize" type="button">
        <Radio label="large">Large</Radio>
        <Radio label="default">Default</Radio>
        <Radio label="small">small</Radio>
      </RadioGroup>
      <Button :size="buttonSize" type="primary">Primary</Button>
      <Button :size="buttonSize" type="default">Default</Button>
      <Button :size="buttonSize" type="dashed">Dashed</Button>
      <Button :size="buttonSize" type="text">Text</Button>
      <Button :size="buttonSize" icon="ios-download-outline" type="primary" shape="circle"></Button>
      <Button :size="buttonSize" icon="ios-download-outline" type="primary">Download</Button>
      <ButtonGroup :size="buttonSize">
        <Button :size="buttonSize" type="primary">
          <Icon type="ios-arrow-back" />
          Backward
        </Button>
        <Button :size="buttonSize" type="primary">
          Forward
          <Icon type="ios-arrow-forward" />
        </Button>
      </ButtonGroup>
    </p>

    <h3>长按钮</h3>
    <p>
      <Button type="success" long>SUBMIT</Button>
      <Button type="error" long>DELETE</Button>
    </p>

    <h3>不可用状态</h3>
    <p>
      <Button>Default</Button>
      <Button disabled>Default(Disabled)</Button>
      <Button type="primary">Primary</Button>
      <Button type="primary" disabled>Primary(Disabled)</Button>
      <Button type="dashed">Dashed</Button>
      <Button type="dashed" disabled>Dashed(Disabled)</Button>
      <Button type="text">Text</Button>
      <Button type="text" disabled>Text(Disabled)</Button>
    </p>

    <h3>加载中状态</h3>
    <p>
      <Button type="primary" loading>Loading...</Button>
      <Button type="primary" :loading="loading" @click="toLoading">
        <span v-if="!loading">Click me!</span>
        <span v-else>Loading...</span>
      </Button>
      <Button type="primary" :loading="loading2" icon="ios-power" @click="toLoading2">
        <span v-if="!loading2">Click me!</span>
        <span v-else>Loading...</span>
      </Button>
      <Button loading shape="circle"></Button>
      <Button loading shape="circle" type="primary"></Button>
    </p>

    <h3>按钮组合</h3>
    <p>
      <ButtonGroup>
        <Button>Cancel</Button>
        <Button type="primary">Confirm</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button disabled>Yesterday</Button>
        <Button disabled>Today</Button>
        <Button disabled>Tomorrow</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button type="primary">L</Button>
        <Button>M</Button>
        <Button>M</Button>
        <Button type="dashed">R</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button type="primary">
          <Icon type="ios-arrow-back"></Icon>
          Backward
        </Button>
        <Button type="primary">
          Forward
          <Icon type="ios-arrow-forward"></Icon>
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button type="primary" icon="ios-skip-backward"></Button>
        <Button type="primary" icon="ios-skip-forward"></Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button icon="ios-color-wand-outline"></Button>
        <Button icon="ios-sunny-outline"></Button>
        <Button icon="ios-crop"></Button>
        <Button icon="ios-color-filter-outline"></Button>
      </ButtonGroup>
      <ButtonGroup shape="circle">
        <Button type="primary">
          <Icon type="ios-arrow-back"></Icon>
          Backward
        </Button>
        <Button type="primary">
          Forward
          <Icon type="ios-arrow-forward"></Icon>
        </Button>
      </ButtonGroup>
      <ButtonGroup shape="circle">
        <Button type="primary" icon="ios-skip-backward"></Button>
        <Button type="primary" icon="ios-skip-forward"></Button>
      </ButtonGroup>
      <ButtonGroup shape="circle">
        <Button icon="ios-color-wand-outline"></Button>
        <Button icon="ios-sunny-outline"></Button>
        <Button icon="ios-crop"></Button>
        <Button icon="ios-color-filter-outline"></Button>
      </ButtonGroup>
      <ButtonGroup size="large">
        <Button>Large</Button>
        <Button>Large</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button>Default</Button>
        <Button>Default</Button>
      </ButtonGroup>
      <ButtonGroup size="small">
        <Button>Small</Button>
        <Button>Small</Button>
      </ButtonGroup>
      <ButtonGroup size="large" shape="circle">
        <Button>Large</Button>
        <Button>Large</Button>
      </ButtonGroup>
      <ButtonGroup shape="circle">
        <Button>Default</Button>
        <Button>Default</Button>
      </ButtonGroup>
      <ButtonGroup size="small" shape="circle">
        <Button>Small</Button>
        <Button>Small</Button>
      </ButtonGroup>
    </p>

    <h3>纵向排列</h3>
    <p>
      <ButtonGroup vertical>
        <Button icon="logo-facebook"></Button>
        <Button icon="logo-twitter"></Button>
        <Button icon="logo-googleplus"></Button>
        <Button icon="logo-tumblr"></Button>
      </ButtonGroup>
    </p>

    <h3>buttons API</h3>
    <img src="../assets/api/buttons.png">
  </div>
</template>

<script>
  export default {
    name: 'buttons',
    data () {
      return {
        buttonSize: 'default',
        loading: false,
        loading2: false
      }
    },
    methods: {
      toLoading () {
        this.loading = true;
      },
      toLoading2 () {
        this.loading2 = true;
      }
    }
  }
</script>

<style scoped>
  h3 {
    margin-top: 30px;
    margin-bottom: 5px;
  }
</style>
