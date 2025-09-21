import {Question} from "@/types/type-question";

export const questions: Question[] = [
    {
        id: 1,
        type: "multiple-choice",
        question: "Quelle est la complexité temporelle de la recherche dans un tableau trié avec la recherche binaire ?",
        options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
        correctAnswer: 1,
        explanation:
            "La recherche binaire divise l'espace de recherche par 2 à chaque étape, donnant une complexité O(log n).",
    },
    {
        id: 2,
        type: "code-correction",
        question: "Corrigez ce code JavaScript qui devrait calculer la factorielle d'un nombre :",
        buggyCode: `function factorial(n) {
  if (n = 0) {
    return 1;
  }
  return n * factorial(n - 1);
}`,
        correctCode: `function factorial(n) {
  if (n === 0) {
    return 1;
  }
  return n * factorial(n - 1);
}`,
        language: "javascript",
        hint: "Regardez attentivement l'opérateur de comparaison dans la condition if.",
        explanation:
            "L'erreur était l'utilisation de l'opérateur d'assignation (=) au lieu de l'opérateur de comparaison (===).",
    },
    {
        id: 3,
        type: "multiple-choice",
        question: "En Python, que fait l'instruction 'pass' ?",
        options: [
            "Elle termine le programme",
            "Elle passe à la ligne suivante",
            "Elle ne fait rien (instruction vide)",
            "Elle lève une exception",
        ],
        correctAnswer: 2,
        explanation:
            "L'instruction 'pass' est une instruction nulle qui ne fait rien. Elle est utilisée comme placeholder.",
    },
    {
        id: 4,
        type: "code-correction",
        question: "Corrigez cette fonction Python qui devrait retourner le maximum de deux nombres :",
        buggyCode: `def max_number(a, b):
  if a > b:
    return a
  else:
    return a`,
        correctCode: `def max_number(a, b):
  if a > b:
    return a
  else:
    return b`,
        language: "python",
        hint: "Vérifiez ce qui est retourné dans le cas 'else'.",
        explanation: "Dans le cas 'else', la fonction retournait 'a' au lieu de 'b', ce qui était incorrect.",
    },
    {
        id: 5,
        type: "code-correction",
        question: "Corrigez ce code CSS qui devrait centrer un élément horizontalement :",
        buggyCode: `.center {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}`,
        correctCode: `.center {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}`,
        language: "css",
        hint: "Pour centrer verticalement avec flexbox, il faut aussi définir une hauteur.",
        explanation:
            "Pour que align-items: center fonctionne pour le centrage vertical, le conteneur doit avoir une hauteur définie.",
    },
]
