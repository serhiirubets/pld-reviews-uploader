(function () {
  function saveGrade(studentsId, grade) {
    CallApi('POST', 'academics/grades', {
      studentsId: studentsId,
      sectionsId: GetQueryString('seid'),
      grade: grade
    }, saveGradeSuccess);
  }

  const form = document.querySelector('#divScores');
  const valuesFromElement = form.querySelectorAll('#divGrades .scores-row .grade-calculated');
  const studentsIds = form.querySelectorAll('.StudentsId');

  if (valuesFromElement.length !== studentsIds.length) return;

  const toElements = form.querySelectorAll('#divStudents #gradeOverride');
  const acceptedScores = ['—', 'A', 'AU', 'B', 'C', 'Cancel', 'CE', 'D', 'Drop', 'F', 'Fail', 'R', 'I', 'IA', 'Pass', 'TC', 'TH', 'W', 'LOA', 'WC'];

  for (let i = 0; i < valuesFromElement.length; i++) {
    const fromValue = valuesFromElement[i].textContent.toUpperCase();
    const studentId = studentsIds[i].value;

    if (!studentId) return;

    if (fromValue && acceptedScores.includes(fromValue)) {
      toElements[i].textContent = fromValue;
      saveGrade(studentId, fromValue)
    }
  }
}());