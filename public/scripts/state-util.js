var StateUtil = (function() {
  var state = {};

  var SAHALE_INIT_STATE = {
    tx: 40,
    ty: 40,
    scale: 1,
    curid: 0,
    tabs_state: {},
    chart_state: 0
  };
  var sahale_state = null;

  state.captureGraphViewYOffset = function(offset) {
    SAHALE_INIT_STATE.ty = offset;
  }

  state.clearFlowState = function(flow_id) {
    sessionStorage.removeItem('flowid-' + flow_id);
  }

  state.getFlowState = function(flow_id) {
    if (sahale_state === null) {
      var new_state = sessionStorage.getItem("flowid-" + flow_id);
      sahale_state = new_state === null ? SAHALE_INIT_STATE : JSON.parse(new_state);
    }
    //console.log("[getFlowState] sahale_state returned: " + JSON.stringify(sahale_state)); // DEBUG
    return sahale_state;
  }

  state.setFlowState = function(flow_id) {
    sessionStorage.setItem("flowid-" + flow_id, JSON.stringify(sahale_state));
    //console.log("[setFlowState] dehydrated sahale_state for browser storage: " + JSON.stringify(sahale_state)); // DEBUG
  }

  state.updateTranslateY = function(val) {
    sahale_state.ty = val;
  }

  state.updateTranslateX = function(val) {
    sahale_state.tx = val;
  }

  state.updateCurrentId = function(val) {
    sahale_state.curid = val;
  }

  state.updateTranslateScale = function(val) {
    sahale_state.scale = val;
  }

  state.getTabState = function(stepnum) {
    return sahale_state.tabs_state[stepnum];
  }

  // tabs should be tracked by CSS classname to set "active", indexed per step number
  state.updateTabState = function(stepnum, klazz) {
    sahale_state.tabs_state[stepnum] = klazz;
  }

  // just track clicks for use in toggle-utils
  state.incrementChartState = function() {
    sahale_state.chart_state += 1;
  }

  state.getChartState = function() {
    return sahale_state.chart_state;
  }

  // called from graph-util just before setFlowState is called on page refresh
  state.updateViewState = function(transx, transy, sc) {
    state.updateTranslateX(transx);
    state.updateTranslateY(transy);
    state.updateTranslateScale(sc);
    // 'curid' stays the same
  }

  return state;
}());
