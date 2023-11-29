import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';


const useSurveyForm = () => {
  const surveySchema = yup.object({
    Age: yup.string().required('Age is required'),
    Weight: yup.string(),
    Height: yup.string(),
    SportHistory: yup.string(),
    Ailments: yup.string(),
    Disease: yup.string(),
    Surgery: yup.string(),
    ConstantlyMedication: yup.string(),
    Supplement: yup.string(),
    Meals: yup.string(),
    DrinkWater: yup.string(),
    MainGoal: yup.string(),
    TotalExerciseDay: yup.string(),
    WorkoutStyle: yup.string(),
    MaxTrainingTime: yup.string(),
  });

  const form = useForm({
    resolver: yupResolver(surveySchema),
  });

  return {form};
};

export default useSurveyForm;
