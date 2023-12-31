import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getTeamById, updateTeamById } from 'apiSdk/teams';
import { teamValidationSchema } from 'validationSchema/teams';
import { TeamInterface } from 'interfaces/team';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';

function TeamEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const imageUploaderRef = useRef(null);
  const { data, error, isLoading, mutate } = useSWR<TeamInterface>(
    () => (id ? `/teams/${id}` : null),
    () => getTeamById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: TeamInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      await imageUploaderRef.current.handleUpload();
      const updated = await updateTeamById(id, values);
      mutate(updated);
      resetForm();
      router.push('/teams');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const handleImageChange = async (file: File | null) => {
    //
  };

  const formik = useFormik<TeamInterface>({
    initialValues: data,
    validationSchema: teamValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Teams',
              link: '/teams',
            },
            {
              label: 'Update Team',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Team
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper wrapperProps={{ mb: 3 }}>
          <ImagePicker ref={imageUploaderRef} onChange={handleImageChange} entity="team" entityId={id} />
        </FormWrapper>

        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.description}
            label={'Description'}
            props={{
              name: 'description',
              placeholder: 'Description',
              value: formik.values?.description,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.image}
            label={'Image'}
            props={{
              name: 'image',
              placeholder: 'Image',
              value: formik.values?.image,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.name}
            label={'Name'}
            props={{
              name: 'name',
              placeholder: 'Name',
              value: formik.values?.name,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Team Lead Id"
            formControlProps={{
              id: 'team_lead_id',
              isInvalid: !!formik.errors?.team_lead_id,
            }}
            name="team_lead_id"
            error={formik.errors?.team_lead_id}
            value={formik.values?.team_lead_id}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('team_lead_id', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <TextInput
            error={formik.errors.performance_evaluation_frequency}
            label={'Performance Evaluation Frequency'}
            props={{
              name: 'performance_evaluation_frequency',
              placeholder: 'Performance Evaluation Frequency',
              value: formik.values?.performance_evaluation_frequency,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Team Size"
            formControlProps={{
              id: 'team_size',
              isInvalid: !!formik.errors?.team_size,
            }}
            name="team_size"
            error={formik.errors?.team_size}
            value={formik.values?.team_size}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('team_size', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Team Budget"
            formControlProps={{
              id: 'team_budget',
              isInvalid: !!formik.errors?.team_budget,
            }}
            name="team_budget"
            error={formik.errors?.team_budget}
            value={formik.values?.team_budget}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('team_budget', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Team Performance Score"
            formControlProps={{
              id: 'team_performance_score',
              isInvalid: !!formik.errors?.team_performance_score,
            }}
            name="team_performance_score"
            error={formik.errors?.team_performance_score}
            value={formik.values?.team_performance_score}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('team_performance_score', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <TextInput
            error={formik.errors.team_objective}
            label={'Team Objective'}
            props={{
              name: 'team_objective',
              placeholder: 'Team Objective',
              value: formik.values?.team_objective,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.team_vision}
            label={'Team Vision'}
            props={{
              name: 'team_vision',
              placeholder: 'Team Vision',
              value: formik.values?.team_vision,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Team Morale Score"
            formControlProps={{
              id: 'team_morale_score',
              isInvalid: !!formik.errors?.team_morale_score,
            }}
            name="team_morale_score"
            error={formik.errors?.team_morale_score}
            value={formik.values?.team_morale_score}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('team_morale_score', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Team Productivity Score"
            formControlProps={{
              id: 'team_productivity_score',
              isInvalid: !!formik.errors?.team_productivity_score,
            }}
            name="team_productivity_score"
            error={formik.errors?.team_productivity_score}
            value={formik.values?.team_productivity_score}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('team_productivity_score', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Team Vacation Quota"
            formControlProps={{
              id: 'team_vacation_quota',
              isInvalid: !!formik.errors?.team_vacation_quota,
            }}
            name="team_vacation_quota"
            error={formik.errors?.team_vacation_quota}
            value={formik.values?.team_vacation_quota}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('team_vacation_quota', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/teams')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'team',
    operation: AccessOperationEnum.UPDATE,
  }),
)(TeamEditPage);
