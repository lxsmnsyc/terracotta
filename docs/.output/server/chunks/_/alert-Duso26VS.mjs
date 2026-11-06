import { e as createTag } from '../routes/_..._.mjs';
import { dynamic, mergeProps } from '@solidjs/web';
import { createUniqueId, omit } from 'solid-js';

var ALERT_TAG = createTag("alert");
function Alert(props) {
  const alertID = createUniqueId();
  const rest = omit(props, "as");
  return dynamic(() => props.as || "div")(mergeProps({ id: alertID }, rest, ALERT_TAG, { role: "alert" }));
}

export { Alert as A };
//# sourceMappingURL=alert-Duso26VS.mjs.map
