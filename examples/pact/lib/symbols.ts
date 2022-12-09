export const PactFfi_SYMBOLS = {
  malloc: {
    args: [FFIType.usize],
    returns: FFIType.pointer
  },
  calloc: {
    args: [FFIType.usize, FFIType.usize],
    returns: FFIType.pointer
  },
  realloc: {
    args: [FFIType.pointer, FFIType.usize],
    returns: FFIType.pointer
  },
  free: {
    args: [FFIType.pointer],
    returns: FFIType.void
  },
  posix_memalign: {
    args: [FFIType.pointer, FFIType.usize, FFIType.usize],
    returns: FFIType.i32
  },
  abort: {
    args: [],
    returns: FFIType.void
  },
  getenv: {
    args: [FFIType.cstring],
    returns: FFIType.cstring
  },
  realpath: {
    args: [FFIType.cstring, FFIType.cstring],
    returns: FFIType.cstring
  },
  pactffi_version: {
    args: [],
    returns: FFIType.cstring
  },
  pactffi_init: {
    args: [FFIType.cstring],
    returns: FFIType.void
  },
  pactffi_init_with_log_level: {
    args: [FFIType.cstring],
    returns: FFIType.void
  },
  pactffi_enable_ansi_support: {
    args: [],
    returns: FFIType.void
  },
  pactffi_log_message: {
    args: [FFIType.cstring, FFIType.cstring, FFIType.cstring],
    returns: FFIType.void
  },
  pactffi_match_message: {
    args: [FFIType.pointer, FFIType.pointer],
    returns: FFIType.pointer
  },
  pactffi_mismatches_get_iter: {
    args: [FFIType.pointer],
    returns: FFIType.pointer
  },
  pactffi_mismatches_delete: {
    args: [FFIType.pointer],
    returns: FFIType.void
  },
  pactffi_mismatches_iter_next: {
    args: [FFIType.pointer],
    returns: FFIType.pointer
  },
  pactffi_mismatches_iter_delete: {
    args: [FFIType.pointer],
    returns: FFIType.void
  },
  pactffi_mismatch_to_json: {
    args: [FFIType.pointer],
    returns: FFIType.cstring
  },
  pactffi_mismatch_type: {
    args: [FFIType.pointer],
    returns: FFIType.cstring
  },
  pactffi_mismatch_summary: {
    args: [FFIType.pointer],
    returns: FFIType.cstring
  },
  pactffi_mismatch_description: {
    args: [FFIType.pointer],
    returns: FFIType.cstring
  },
  pactffi_mismatch_ansi_description: {
    args: [FFIType.pointer],
    returns: FFIType.cstring
  },
  pactffi_get_error_message: {
    args: [FFIType.cstring, FFIType.i32],
    returns: FFIType.i32
  },
  pactffi_log_to_stdout: {
    args: [FFIType.i32],
    returns: FFIType.i32
  },
  pactffi_log_to_stderr: {
    args: [FFIType.i32],
    returns: FFIType.i32
  },
  pactffi_log_to_file: {
    args: [FFIType.cstring, FFIType.i32],
    returns: FFIType.i32
  },
  pactffi_log_to_buffer: {
    args: [FFIType.i32],
    returns: FFIType.i32
  },
  pactffi_logger_init: {
    args: [],
    returns: FFIType.void
  },
  pactffi_logger_attach_sink: {
    args: [FFIType.cstring, FFIType.i32],
    returns: FFIType.i32
  },
  pactffi_logger_apply: {
    args: [],
    returns: FFIType.i32
  },
  pactffi_fetch_log_buffer: {
    args: [FFIType.cstring],
    returns: FFIType.cstring
  },
  pactffi_parse_pact_json: {
    args: [FFIType.cstring],
    returns: FFIType.pointer
  },
  pactffi_pact_model_delete: {
    args: [FFIType.pointer],
    returns: FFIType.void
  },
  pactffi_consumer_get_name: {
    args: [FFIType.pointer],
    returns: FFIType.cstring
  },
  pactffi_message_new: {
    args: [],
    returns: FFIType.pointer
  },
  pactffi_message_new_from_json: {
    args: [FFIType.u32, FFIType.cstring, FFIType.i32],
    returns: FFIType.pointer
  },
  pactffi_message_new_from_body: {
    args: [FFIType.cstring, FFIType.cstring],
    returns: FFIType.pointer
  },
  pactffi_message_delete: {
    args: [FFIType.pointer],
    returns: FFIType.void
  },
  pactffi_message_get_contents: {
    args: [FFIType.pointer],
    returns: FFIType.cstring
  },
  pactffi_message_set_contents: {
    args: [FFIType.pointer, FFIType.cstring, FFIType.cstring],
    returns: FFIType.void
  },
  pactffi_message_get_contents_length: {
    args: [FFIType.pointer],
    returns: FFIType.usize
  },
  pactffi_message_get_contents_bin: {
    args: [FFIType.pointer],
    returns: FFIType.pointer
  },
  pactffi_message_set_contents_bin: {
    args: [FFIType.pointer, FFIType.pointer, FFIType.usize, FFIType.cstring],
    returns: FFIType.void
  },
  pactffi_message_get_description: {
    args: [FFIType.pointer],
    returns: FFIType.cstring
  },
  pactffi_message_set_description: {
    args: [FFIType.pointer, FFIType.cstring],
    returns: FFIType.i32
  },
  pactffi_message_get_provider_state: {
    args: [FFIType.pointer, FFIType.u32],
    returns: FFIType.pointer
  },
  pactffi_message_get_provider_state_iter: {
    args: [FFIType.pointer],
    returns: FFIType.pointer
  },
  pactffi_provider_state_iter_next: {
    args: [FFIType.pointer],
    returns: FFIType.pointer
  },
  pactffi_provider_state_iter_delete: {
    args: [FFIType.pointer],
    returns: FFIType.void
  },
  pactffi_message_find_metadata: {
    args: [FFIType.pointer, FFIType.cstring],
    returns: FFIType.cstring
  },
  pactffi_message_insert_metadata: {
    args: [FFIType.pointer, FFIType.cstring, FFIType.cstring],
    returns: FFIType.i32
  },
  pactffi_message_get_metadata_iter: {
    args: [FFIType.pointer],
    returns: FFIType.pointer
  },
  pactffi_message_metadata_iter_next: {
    args: [FFIType.pointer],
    returns: FFIType.pointer
  },
  pactffi_message_metadata_iter_delete: {
    args: [FFIType.pointer],
    returns: FFIType.void
  },
  pactffi_message_metadata_pair_delete: {
    args: [FFIType.pointer],
    returns: FFIType.void
  },
  pactffi_message_pact_new_from_json: {
    args: [FFIType.cstring, FFIType.cstring],
    returns: FFIType.pointer
  },
  pactffi_message_pact_delete: {
    args: [FFIType.pointer],
    returns: FFIType.void
  },
  pactffi_message_pact_get_consumer: {
    args: [FFIType.pointer],
    returns: FFIType.pointer
  },
  pactffi_message_pact_get_provider: {
    args: [FFIType.pointer],
    returns: FFIType.pointer
  },
  pactffi_message_pact_get_message_iter: {
    args: [FFIType.pointer],
    returns: FFIType.pointer
  },
  pactffi_message_pact_message_iter_next: {
    args: [FFIType.pointer],
    returns: FFIType.pointer
  },
  pactffi_message_pact_message_iter_delete: {
    args: [FFIType.pointer],
    returns: FFIType.void
  },
  pactffi_message_pact_find_metadata: {
    args: [FFIType.pointer, FFIType.cstring, FFIType.cstring],
    returns: FFIType.cstring
  },
  pactffi_message_pact_get_metadata_iter: {
    args: [FFIType.pointer],
    returns: FFIType.pointer
  },
  pactffi_message_pact_metadata_iter_next: {
    args: [FFIType.pointer],
    returns: FFIType.pointer
  },
  pactffi_message_pact_metadata_iter_delete: {
    args: [FFIType.pointer],
    returns: FFIType.void
  },
  pactffi_message_pact_metadata_triple_delete: {
    args: [FFIType.pointer],
    returns: FFIType.void
  },
  pactffi_provider_get_name: {
    args: [FFIType.pointer],
    returns: FFIType.cstring
  },
  pactffi_provider_state_get_name: {
    args: [FFIType.pointer],
    returns: FFIType.cstring
  },
  pactffi_provider_state_get_param_iter: {
    args: [FFIType.pointer],
    returns: FFIType.pointer
  },
  pactffi_provider_state_param_iter_next: {
    args: [FFIType.pointer],
    returns: FFIType.pointer
  },
  pactffi_provider_state_delete: {
    args: [FFIType.pointer],
    returns: FFIType.void
  },
  pactffi_provider_state_param_iter_delete: {
    args: [FFIType.pointer],
    returns: FFIType.void
  },
  pactffi_provider_state_param_pair_delete: {
    args: [FFIType.pointer],
    returns: FFIType.void
  },
  pactffi_pact_message_iter_delete: {
    args: [FFIType.pointer],
    returns: FFIType.void
  },
  pactffi_pact_message_iter_next: {
    args: [FFIType.pointer],
    returns: FFIType.pointer
  },
  pactffi_pact_sync_message_iter_next: {
    args: [FFIType.pointer],
    returns: FFIType.pointer
  },
  pactffi_pact_sync_message_iter_delete: {
    args: [FFIType.pointer],
    returns: FFIType.void
  },
  pactffi_pact_sync_http_iter_next: {
    args: [FFIType.pointer],
    returns: FFIType.pointer
  },
  pactffi_pact_sync_http_iter_delete: {
    args: [FFIType.pointer],
    returns: FFIType.void
  },
  pactffi_sync_message_new: {
    args: [],
    returns: FFIType.pointer
  },
  pactffi_sync_message_delete: {
    args: [FFIType.pointer],
    returns: FFIType.void
  },
  pactffi_sync_message_get_request_contents: {
    args: [FFIType.pointer],
    returns: FFIType.cstring
  },
  pactffi_sync_message_set_request_contents: {
    args: [FFIType.pointer, FFIType.cstring, FFIType.cstring],
    returns: FFIType.void
  },
  pactffi_sync_message_get_request_contents_length: {
    args: [FFIType.pointer],
    returns: FFIType.usize
  },
  pactffi_sync_message_get_request_contents_bin: {
    args: [FFIType.pointer],
    returns: FFIType.pointer
  },
  pactffi_sync_message_set_request_contents_bin: {
    args: [FFIType.pointer, FFIType.pointer, FFIType.usize, FFIType.cstring],
    returns: FFIType.void
  },
  pactffi_sync_message_get_number_responses: {
    args: [FFIType.pointer],
    returns: FFIType.usize
  },
  pactffi_sync_message_get_response_contents: {
    args: [FFIType.pointer, FFIType.usize],
    returns: FFIType.cstring
  },
  pactffi_sync_message_set_response_contents: {
    args: [FFIType.pointer, FFIType.usize, FFIType.cstring, FFIType.cstring],
    returns: FFIType.void
  },
  pactffi_sync_message_get_response_contents_length: {
    args: [FFIType.pointer, FFIType.usize],
    returns: FFIType.usize
  },
  pactffi_sync_message_get_response_contents_bin: {
    args: [FFIType.pointer, FFIType.usize],
    returns: FFIType.pointer
  },
  pactffi_sync_message_set_response_contents_bin: {
    args: [FFIType.pointer, FFIType.usize, FFIType.pointer, FFIType.usize, FFIType.cstring],
    returns: FFIType.void
  },
  pactffi_sync_message_get_description: {
    args: [FFIType.pointer],
    returns: FFIType.cstring
  },
  pactffi_sync_message_set_description: {
    args: [FFIType.pointer, FFIType.cstring],
    returns: FFIType.i32
  },
  pactffi_sync_message_get_provider_state: {
    args: [FFIType.pointer, FFIType.u32],
    returns: FFIType.pointer
  },
  pactffi_sync_message_get_provider_state_iter: {
    args: [FFIType.pointer],
    returns: FFIType.pointer
  },
  pactffi_sync_http_new: {
    args: [],
    returns: FFIType.pointer
  },
  pactffi_sync_http_delete: {
    args: [FFIType.pointer],
    returns: FFIType.void
  },
  pactffi_sync_http_get_request_contents: {
    args: [FFIType.pointer],
    returns: FFIType.cstring
  },
  pactffi_sync_http_set_request_contents: {
    args: [FFIType.pointer, FFIType.cstring, FFIType.cstring],
    returns: FFIType.void
  },
  pactffi_sync_http_get_request_contents_length: {
    args: [FFIType.pointer],
    returns: FFIType.usize
  },
  pactffi_sync_http_get_request_contents_bin: {
    args: [FFIType.pointer],
    returns: FFIType.pointer
  },
  pactffi_sync_http_set_request_contents_bin: {
    args: [FFIType.pointer, FFIType.pointer, FFIType.usize, FFIType.cstring],
    returns: FFIType.void
  },
  pactffi_sync_http_get_response_contents: {
    args: [FFIType.pointer],
    returns: FFIType.cstring
  },
  pactffi_sync_http_set_response_contents: {
    args: [FFIType.pointer, FFIType.cstring, FFIType.cstring],
    returns: FFIType.void
  },
  pactffi_sync_http_get_response_contents_length: {
    args: [FFIType.pointer],
    returns: FFIType.usize
  },
  pactffi_sync_http_get_response_contents_bin: {
    args: [FFIType.pointer],
    returns: FFIType.pointer
  },
  pactffi_sync_http_set_response_contents_bin: {
    args: [FFIType.pointer, FFIType.pointer, FFIType.usize, FFIType.cstring],
    returns: FFIType.void
  },
  pactffi_sync_http_get_description: {
    args: [FFIType.pointer],
    returns: FFIType.cstring
  },
  pactffi_sync_http_set_description: {
    args: [FFIType.pointer, FFIType.cstring],
    returns: FFIType.i32
  },
  pactffi_sync_http_get_provider_state: {
    args: [FFIType.pointer, FFIType.u32],
    returns: FFIType.pointer
  },
  pactffi_sync_http_get_provider_state_iter: {
    args: [FFIType.pointer],
    returns: FFIType.pointer
  },
  pactffi_parse_matcher_definition: {
    args: [FFIType.cstring],
    returns: FFIType.pointer
  },
  pactffi_matcher_definition_error: {
    args: [FFIType.pointer],
    returns: FFIType.cstring
  },
  pactffi_matcher_definition_value: {
    args: [FFIType.pointer],
    returns: FFIType.cstring
  },
  pactffi_matcher_definition_delete: {
    args: [FFIType.pointer],
    returns: FFIType.void
  },
  pactffi_matcher_definition_generator: {
    args: [FFIType.pointer],
    returns: FFIType.pointer
  },
  pactffi_matcher_definition_value_type: {
    args: [FFIType.pointer],
    returns: FFIType.i32
  },
  pactffi_matching_rule_iter_delete: {
    args: [FFIType.pointer],
    returns: FFIType.void
  },
  pactffi_matcher_definition_iter: {
    args: [FFIType.pointer],
    returns: FFIType.pointer
  },
  pactffi_matching_rule_iter_next: {
    args: [FFIType.pointer],
    returns: FFIType.pointer
  },
  pactffi_matching_rule_to_json: {
    args: [FFIType.pointer],
    returns: FFIType.cstring
  },
  pactffi_generator_to_json: {
    args: [FFIType.pointer],
    returns: FFIType.cstring
  },
  pactffi_generator_generate_string: {
    args: [FFIType.pointer, FFIType.cstring],
    returns: FFIType.cstring
  },
  pactffi_generator_generate_integer: {
    args: [FFIType.pointer, FFIType.cstring],
    returns: FFIType.u16
  },
  pactffi_string_delete: {
    args: [FFIType.cstring],
    returns: FFIType.void
  },
  pactffi_create_mock_server: {
    args: [FFIType.cstring, FFIType.cstring, FFIType.bool],
    returns: FFIType.i32
  },
  pactffi_get_tls_ca_certificate: {
    args: [],
    returns: FFIType.cstring
  },
  pactffi_create_mock_server_for_pact: {
    args: [FFIType.u16, FFIType.cstring, FFIType.bool],
    returns: FFIType.i32
  },
  pactffi_create_mock_server_for_transport: {
    args: [FFIType.u16, FFIType.cstring, FFIType.u16, FFIType.cstring, FFIType.cstring],
    returns: FFIType.i32
  },
  pactffi_mock_server_matched: {
    args: [FFIType.i32],
    returns: FFIType.bool
  },
  pactffi_mock_server_mismatches: {
    args: [FFIType.i32],
    returns: FFIType.cstring
  },
  pactffi_cleanup_mock_server: {
    args: [FFIType.i32],
    returns: FFIType.bool
  },
  pactffi_write_pact_file: {
    args: [FFIType.i32, FFIType.cstring, FFIType.bool],
    returns: FFIType.i32
  },
  pactffi_mock_server_logs: {
    args: [FFIType.i32],
    returns: FFIType.cstring
  },
  pactffi_generate_datetime_string: {
    args: [FFIType.cstring],
    returns: FFIType.pointer
  },
  pactffi_check_regex: {
    args: [FFIType.cstring, FFIType.cstring],
    returns: FFIType.bool
  },
  pactffi_generate_regex_value: {
    args: [FFIType.cstring],
    returns: FFIType.pointer
  },
  pactffi_free_string: {
    args: [FFIType.cstring],
    returns: FFIType.void
  },
  pactffi_new_pact: {
    args: [FFIType.cstring, FFIType.cstring],
    returns: FFIType.u16
  },
  pactffi_new_interaction: {
    args: [FFIType.u16, FFIType.cstring],
    returns: FFIType.u32
  },
  pactffi_new_message_interaction: {
    args: [FFIType.u16, FFIType.cstring],
    returns: FFIType.u32
  },
  pactffi_new_sync_message_interaction: {
    args: [FFIType.u16, FFIType.cstring],
    returns: FFIType.u32
  },
  pactffi_upon_receiving: {
    args: [FFIType.u32, FFIType.cstring],
    returns: FFIType.bool
  },
  pactffi_given: {
    args: [FFIType.u32, FFIType.cstring],
    returns: FFIType.bool
  },
  pactffi_interaction_test_name: {
    args: [FFIType.u32, FFIType.cstring],
    returns: FFIType.u32
  },
  pactffi_given_with_param: {
    args: [FFIType.u32, FFIType.cstring, FFIType.cstring, FFIType.cstring],
    returns: FFIType.bool
  },
  pactffi_with_request: {
    args: [FFIType.u32, FFIType.cstring, FFIType.cstring],
    returns: FFIType.bool
  },
  pactffi_with_query_parameter: {
    args: [FFIType.u32, FFIType.cstring, FFIType.usize, FFIType.cstring],
    returns: FFIType.bool
  },
  pactffi_with_query_parameter_v2: {
    args: [FFIType.u32, FFIType.cstring, FFIType.usize, FFIType.cstring],
    returns: FFIType.bool
  },
  pactffi_with_specification: {
    args: [FFIType.u16, FFIType.i32],
    returns: FFIType.bool
  },
  pactffi_with_pact_metadata: {
    args: [FFIType.u16, FFIType.cstring, FFIType.cstring, FFIType.cstring],
    returns: FFIType.bool
  },
  pactffi_with_header: {
    args: [FFIType.u32, FFIType.i32, FFIType.cstring, FFIType.usize, FFIType.cstring],
    returns: FFIType.bool
  },
  pactffi_with_header_v2: {
    args: [FFIType.u32, FFIType.i32, FFIType.cstring, FFIType.usize, FFIType.cstring],
    returns: FFIType.bool
  },
  pactffi_response_status: {
    args: [FFIType.u32, FFIType.u16],
    returns: FFIType.bool
  },
  pactffi_with_body: {
    args: [FFIType.u32, FFIType.i32, FFIType.cstring, FFIType.cstring],
    returns: FFIType.bool
  },
  pactffi_with_binary_file: {
    args: [FFIType.u32, FFIType.i32, FFIType.cstring, FFIType.pointer, FFIType.usize],
    returns: FFIType.bool
  },
  pactffi_with_multipart_file: {
    args: [FFIType.u32, FFIType.i32, FFIType.cstring, FFIType.cstring, FFIType.cstring],
    returns: FFIType.pointer
  },
  pactffi_pact_handle_get_message_iter: {
    args: [FFIType.u16],
    returns: FFIType.pointer
  },
  pactffi_pact_handle_get_sync_message_iter: {
    args: [FFIType.u16],
    returns: FFIType.pointer
  },
  pactffi_pact_handle_get_sync_http_iter: {
    args: [FFIType.u16],
    returns: FFIType.pointer
  },
  pactffi_new_message_pact: {
    args: [FFIType.cstring, FFIType.cstring],
    returns: FFIType.u16
  },
  pactffi_new_message: {
    args: [FFIType.u16, FFIType.cstring],
    returns: FFIType.u32
  },
  pactffi_message_expects_to_receive: {
    args: [FFIType.u32, FFIType.cstring],
    returns: FFIType.void
  },
  pactffi_message_given: {
    args: [FFIType.u32, FFIType.cstring],
    returns: FFIType.void
  },
  pactffi_message_given_with_param: {
    args: [FFIType.u32, FFIType.cstring, FFIType.cstring, FFIType.cstring],
    returns: FFIType.void
  },
  pactffi_message_with_contents: {
    args: [FFIType.u32, FFIType.cstring, FFIType.pointer, FFIType.usize],
    returns: FFIType.void
  },
  pactffi_message_with_metadata: {
    args: [FFIType.u32, FFIType.cstring, FFIType.cstring],
    returns: FFIType.void
  },
  pactffi_message_reify: {
    args: [FFIType.u32],
    returns: FFIType.cstring
  },
  pactffi_write_message_pact_file: {
    args: [FFIType.u16, FFIType.cstring, FFIType.bool],
    returns: FFIType.i32
  },
  pactffi_with_message_pact_metadata: {
    args: [FFIType.u16, FFIType.cstring, FFIType.cstring, FFIType.cstring],
    returns: FFIType.void
  },
  pactffi_pact_handle_write_file: {
    args: [FFIType.u16, FFIType.cstring, FFIType.bool],
    returns: FFIType.i32
  },
  pactffi_new_async_message: {
    args: [FFIType.u16, FFIType.cstring],
    returns: FFIType.u32
  },
  pactffi_free_pact_handle: {
    args: [FFIType.u16],
    returns: FFIType.u32
  },
  pactffi_free_message_pact_handle: {
    args: [FFIType.u16],
    returns: FFIType.u32
  },
  pactffi_verify: {
    args: [FFIType.cstring],
    returns: FFIType.i32
  },
  pactffi_verifier_new: {
    args: [],
    returns: FFIType.pointer
  },
  pactffi_verifier_new_for_application: {
    args: [FFIType.cstring, FFIType.cstring],
    returns: FFIType.pointer
  },
  pactffi_verifier_shutdown: {
    args: [FFIType.pointer],
    returns: FFIType.void
  },
  pactffi_verifier_set_provider_info: {
    args: [FFIType.pointer, FFIType.cstring, FFIType.cstring, FFIType.cstring, FFIType.u16, FFIType.cstring],
    returns: FFIType.void
  },
  pactffi_verifier_add_provider_transport: {
    args: [FFIType.pointer, FFIType.cstring, FFIType.u16, FFIType.cstring, FFIType.cstring],
    returns: FFIType.void
  },
  pactffi_verifier_set_filter_info: {
    args: [FFIType.pointer, FFIType.cstring, FFIType.cstring, FFIType.u8],
    returns: FFIType.void
  },
  pactffi_verifier_set_provider_state: {
    args: [FFIType.pointer, FFIType.cstring, FFIType.u8, FFIType.u8],
    returns: FFIType.void
  },
  pactffi_verifier_set_verification_options: {
    args: [FFIType.pointer, FFIType.u8, FFIType.u64],
    returns: FFIType.i32
  },
  pactffi_verifier_set_coloured_output: {
    args: [FFIType.pointer, FFIType.u8],
    returns: FFIType.i32
  },
  pactffi_verifier_set_no_pacts_is_error: {
    args: [FFIType.pointer, FFIType.u8],
    returns: FFIType.i32
  },
  pactffi_verifier_set_publish_options: {
    args: [FFIType.pointer, FFIType.cstring, FFIType.cstring, FFIType.pointer, FFIType.u16, FFIType.cstring],
    returns: FFIType.i32
  },
  pactffi_verifier_set_consumer_filters: {
    args: [FFIType.pointer, FFIType.pointer, FFIType.u16],
    returns: FFIType.void
  },
  pactffi_verifier_add_custom_header: {
    args: [FFIType.pointer, FFIType.cstring, FFIType.cstring],
    returns: FFIType.void
  },
  pactffi_verifier_add_file_source: {
    args: [FFIType.pointer, FFIType.cstring],
    returns: FFIType.void
  },
  pactffi_verifier_add_directory_source: {
    args: [FFIType.pointer, FFIType.cstring],
    returns: FFIType.void
  },
  pactffi_verifier_url_source: {
    args: [FFIType.pointer, FFIType.cstring, FFIType.cstring, FFIType.cstring, FFIType.cstring],
    returns: FFIType.void
  },
  pactffi_verifier_broker_source: {
    args: [FFIType.pointer, FFIType.cstring, FFIType.cstring, FFIType.cstring, FFIType.cstring],
    returns: FFIType.void
  },
  pactffi_verifier_broker_source_with_selectors: {
    args: [FFIType.pointer, FFIType.cstring, FFIType.cstring, FFIType.cstring, FFIType.cstring, FFIType.u8, FFIType.cstring, FFIType.pointer, FFIType.u16, FFIType.cstring, FFIType.pointer, FFIType.u16, FFIType.pointer, FFIType.u16],
    returns: FFIType.void
  },
  pactffi_verifier_execute: {
    args: [FFIType.pointer],
    returns: FFIType.i32
  },
  pactffi_verifier_cli_args: {
    args: [],
    returns: FFIType.cstring
  },
  pactffi_verifier_logs: {
    args: [FFIType.pointer],
    returns: FFIType.cstring
  },
  pactffi_verifier_logs_for_provider: {
    args: [FFIType.cstring],
    returns: FFIType.cstring
  },
  pactffi_verifier_output: {
    args: [FFIType.pointer, FFIType.u8],
    returns: FFIType.cstring
  },
  pactffi_verifier_json: {
    args: [FFIType.pointer],
    returns: FFIType.cstring
  },
  pactffi_using_plugin: {
    args: [FFIType.u16, FFIType.cstring, FFIType.cstring],
    returns: FFIType.u32
  },
  pactffi_cleanup_plugins: {
    args: [FFIType.u16],
    returns: FFIType.void
  },
  pactffi_interaction_contents: {
    args: [FFIType.u32, FFIType.i32, FFIType.cstring, FFIType.cstring],
    returns: FFIType.u32
  }
} as const;
