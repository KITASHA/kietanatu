/* ==============================
   JavaScriptエントリーポイント
================================ */

import {
  enforceSurveyCompletion
} from "./common.js";
import {
  initIncludes
} from "./include.js";
import {
  initSurvey
} from "./survey.js";
import {
  initArchiveSearch
} from "./archive.js";
import {
  initSubjectSearch
} from "./subject.js";
import {
  initGameControls
} from "./game.js";

const canContinue = enforceSurveyCompletion();

if (canContinue) {
  document.addEventListener("DOMContentLoaded", () => {
    initIncludes();
    initSurvey();
    initArchiveSearch();
    initSubjectSearch();
    initGameControls();
  });
}
