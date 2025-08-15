# 鲁班

🚀 鲁班是一个基于 Monorepo 架构的企业级活动平台系统，采用前后端分离设计模式，支持多端应用开发和统一组件管理。

## 💻 核心应用模块

包括：luban-activity（主活动页面应用，基于Vue 2.7和Vant UI）、luban-cms（内容管理系统，支持可视化编辑）、luban-server（后端API服务，采用MVC架构）、luban-tv-activity（TV端大屏适配）和luban-rn-activity（React Native移动端）。

## 🔧 技术架构特点

采用Yarn Workspaces进行包管理，使用Turbo构建工具实现高性能增量构建和缓存优化，支持多环境配置（dev、develop、master、preview）。核心技术栈包括Vue 2.7.16、Vant 2.12.54、Pinia状态管理、@vueuse/core工具库等。

## 📦 共享包系统

luban-components（UI组件库，支持多端适配）、luban-page-editor（可视化页面编辑器）、luban-business（跨平台业务逻辑封装）、luban-common（通用工具和事件总线）、luban-store（统一状态管理）。

## 🎯 核心优势

统一的Monorepo架构确保代码一致性和复用性，支持Web/TV/Mobile多端开发，提供可视化编辑功能让非技术人员也能配置活动页面，具备完善的性能监控、自动化埋点、Docker容器化部署等企业级特性。

## ✨ 应用场景

✨ 这是一个成熟的企业级活动平台解决方案，特别适用于需要快速创建和管理各类营销活动页面的业务场景，通过动态组件渲染和数据驱动UI架构，实现了高度的灵活性和可扩展性。
