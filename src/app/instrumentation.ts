export async function register() {
  // "msw/node"がNode.jsランタイムでのみ利用可能（=Edgeランタイムで利用不可）
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // RSCで利用するMSWのモックを初期化
    const { initMocks } = await import("@/libs/msw");
    initMocks();
  }
}
